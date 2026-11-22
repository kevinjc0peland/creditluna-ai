"""Publish one reviewed article: python publish_article.py <slug> [--draft]."""
import argparse
import json
import os
import tempfile
from pathlib import Path

INDEX = Path(__file__).resolve().parent / 'content' / 'articles.json'


def main():
    parser = argparse.ArgumentParser(description='Set an article publication status after editorial approval.')
    parser.add_argument('slug')
    parser.add_argument('--draft', action='store_true', help='Unpublish instead')
    args = parser.parse_args()
    articles = json.loads(INDEX.read_text(encoding='utf-8'))
    article = next((item for item in articles if item['slug'] == args.slug), None)
    if article is None:
        parser.error('Unknown slug: ' + args.slug)
    article['status'] = 'draft' if args.draft else 'published'
    fd, filename = tempfile.mkstemp(dir=INDEX.parent, prefix='.articles-', suffix='.json')
    try:
        with os.fdopen(fd, 'w', encoding='utf-8') as target:
            json.dump(articles, target, indent=2, ensure_ascii=False)
            target.write('\n')
        os.replace(filename, INDEX)
    finally:
        if os.path.exists(filename):
            os.unlink(filename)
    print(f"{article['slug']}: {article['status']}")


if __name__ == '__main__':
    main()
