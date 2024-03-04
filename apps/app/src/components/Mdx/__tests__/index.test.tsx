import { render, screen } from '@testing-library/react-native'
import { Mdx } from '..'

// https://spec.commonmark.org/
describe('commonmark', () => {
  describe('leaf block', () => {
    describe('thematic breaks', () => {
      it('***', () => {
        render(<Mdx content='***' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'View',
          children: null,
        })
      })

      it('---', () => {
        render(<Mdx content='---' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'View',
          children: null,
        })
      })

      it('___', () => {
        render(<Mdx content='___' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'View',
          children: null,
        })
      })
    })

    describe('atx headings', () => {
      it('#', () => {
        render(<Mdx content='# h1' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: ['h1'],
        })
      })

      it('##', () => {
        render(<Mdx content='## h2' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: ['h2'],
        })
      })

      it('###', () => {
        render(<Mdx content='### h3' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: ['h3'],
        })
      })

      it('####', () => {
        render(<Mdx content='#### h4' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: ['h4'],
        })
      })

      it('#####', () => {
        render(<Mdx content='##### h5' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: ['h5'],
        })
      })

      it('######', () => {
        render(<Mdx content='###### h6' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: ['h6'],
        })
      })
    })

    it('setext headings', () => {
      render(<Mdx content='# Foo *bar*' />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        children: [
          'Foo ',
          {
            type: 'Text',
            children: ['bar'],
          },
        ],
      })
    })

    it('fenced code blocks', () => {
      render(<Mdx content={'```\ncode\n```'} />)

      expect(screen.toJSON()).toMatchObject({
        type: 'View',
        children: [
          {
            type: 'Text',
            children: ['code\n'],
          },
        ],
      })
    })
  })

  describe('container block', () => {
    it('block quotes', () => {
      render(<Mdx content={'> line1\n>\n> line2'} />)

      expect(screen.toJSON()).toMatchObject({
        type: 'View',
        children: [
          {
            type: 'Text',
            children: ['line1'],
          },
          {
            type: 'Text',
            children: ['line2'],
          },
        ],
      })
    })

    describe('list items', () => {
      it('bullet list', () => {
        render(<Mdx content={'- item1\n- item2'} />)

        expect(screen.toJSON()).toMatchObject({
          type: 'View',
          children: [
            {
              type: 'Text',
              children: ['item1'],
            },
            {
              type: 'Text',
              children: ['item2'],
            },
          ],
        })
      })

      it('bullet list with nested list', () => {
        render(<Mdx content={'- item1\n  - item1-1\n- item2'} />)

        expect(screen.toJSON()).toMatchObject({
          type: 'View',
          children: [
            {
              type: 'View',
              children: [
                {
                  type: 'Text',
                  children: ['item1'],
                },
                {
                  type: 'View',
                  children: [
                    {
                      type: 'View',
                      children: [
                        {
                          type: 'Text',
                          children: ['item1-1'],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'Text',
              children: ['item2'],
            },
          ],
        })
      })

      it('ordered list', () => {
        render(<Mdx content={'1. item1\n2. item2'} />)

        expect(screen.toJSON()).toMatchObject({
          type: 'View',
          children: [
            {
              type: 'Text',
              children: ['1. item1'],
            },
            {
              type: 'Text',
              children: ['2. item2'],
            },
          ],
        })
      })

      it('ordered list with nested list', () => {
        render(<Mdx content={'1. item1\n  1. item1-1\n2. item2'} />)

        expect(screen.toJSON()).toMatchObject({
          type: 'View',
          children: [
            {
              type: 'Text',
              children: ['1. item1'],
            },
            {
              type: 'Text',
              children: ['2. item1-1'],
            },
            {
              type: 'Text',
              children: ['3. item2'],
            },
          ],
        })
      })
    })
  })

  describe('inlines', () => {
    it('code', () => {
      render(<Mdx content='`code`' />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        children: [
          {
            type: 'Text',
            children: ['code'],
          },
        ],
      })
    })

    it('strong', () => {
      render(<Mdx content='**strong**' />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        children: [
          {
            type: 'Text',
            children: ['strong'],
          },
        ],
      })
    })

    it('emphasis', () => {
      render(<Mdx content='_emphasis_' />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        children: [
          {
            type: 'Text',
            children: ['emphasis'],
          },
        ],
      })
    })

    it('del', () => {
      render(<Mdx content='~~del~~' />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        children: [
          {
            type: 'Text',
            children: ['del'],
          },
        ],
      })
    })

    it('links', () => {
      render(<Mdx content='[title](link)' />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        children: [
          {
            type: 'Text',
            props: { role: 'link' },
            children: ['title'],
          },
        ],
      })
    })

    it('images', () => {
      render(<Mdx content='![title](link)' />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        children: [
          {
            type: 'Image',
            props: { src: 'link', alt: 'title' },
          },
        ],
      })
    })

    it('image with link', () => {
      render(<Mdx content='[![title](img)](url)' />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        children: [
          {
            type: 'Text',
            children: [
              {
                type: 'Image',
                props: { src: 'img', alt: 'title' },
              },
            ],
          },
        ],
      })
    })

    it('hard line breaks', () => {
      render(<Mdx content={'Hello  \nWorld'} />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        children: ['Hello', { type: 'Text' }, '\n', 'World'],
      })
    })

    it('soft line breaks', () => {
      render(<Mdx content={'Hello\nWorld'} />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        children: ['Hello\nWorld'],
      })
    })
  })
})
