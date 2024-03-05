import { render, screen } from '@testing-library/react-native'
import { Mdx } from '..'
import { readFileSync } from 'node:fs'

// https://spec.commonmark.org/
describe('commonmark', () => {
  describe('leaf block', () => {
    describe('thematic breaks', () => {
      it('***', () => {
        render(<Mdx content='***' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: [
            {
              type: 'View',
              children: null,
            },
          ],
        })
      })

      it('---', () => {
        render(<Mdx content='---' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: [
            {
              type: 'View',
              children: null,
            },
          ],
        })
      })

      it('___', () => {
        render(<Mdx content='___' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: [
            {
              type: 'View',
              children: null,
            },
          ],
        })
      })
    })

    describe('atx headings', () => {
      it('#', () => {
        render(<Mdx content='# h1' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: [
            {
              type: 'Text',
              children: ['h1'],
            },
          ],
        })
      })

      it('##', () => {
        render(<Mdx content='## h2' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: [
            {
              type: 'Text',
              children: ['h2'],
            },
          ],
        })
      })

      it('###', () => {
        render(<Mdx content='### h3' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: [
            {
              type: 'Text',
              children: ['h3'],
            },
          ],
        })
      })

      it('####', () => {
        render(<Mdx content='#### h4' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: [
            {
              type: 'Text',
              children: ['h4'],
            },
          ],
        })
      })

      it('#####', () => {
        render(<Mdx content='##### h5' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: [
            {
              type: 'Text',
              children: ['h5'],
            },
          ],
        })
      })

      it('######', () => {
        render(<Mdx content='###### h6' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: [
            {
              type: 'Text',
              children: ['h6'],
            },
          ],
        })
      })
    })

    it('setext headings', () => {
      render(<Mdx content='# Foo *bar*' />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        children: [
          {
            type: 'Text',
            children: [
              'Foo ',
              {
                type: 'Text',
                children: ['bar'],
              },
            ],
          },
        ],
      })
    })

    it('fenced code blocks', () => {
      render(<Mdx content={'```\ncode\n```'} />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        children: [
          {
            type: 'View',
            children: [
              {
                type: 'Text',
                children: ['code\n'],
              },
            ],
          },
        ],
      })
    })
  })

  describe('container block', () => {
    it('block quotes', () => {
      render(<Mdx content={'> line1\n>\n> line2'} />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        children: [
          {
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
          },
        ],
      })
    })

    describe('list items', () => {
      it('bullet list', () => {
        render(<Mdx content={'- item1\n- item2'} />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: [
            {
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
            },
          ],
        })
      })

      it('bullet list with nested list', () => {
        render(<Mdx content={'- item1\n  - item1-1\n- item2'} />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: [
            {
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
            },
          ],
        })
      })

      it('ordered list', () => {
        render(<Mdx content={'1. item1\n2. item2'} />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: [
            {
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
            },
          ],
        })
      })

      it('ordered list with nested list', () => {
        render(<Mdx content={'1. item1\n  1. item1-1\n2. item2'} />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: [
            {
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
        children: [{ type: 'Text', children: ['Hello\nWorld'] }],
      })
    })
  })
})

// https://github.github.com/gfm/
describe('gfm', () => {
  it('table', () => {
    render(<Mdx content={'| foo | bar |\n| --- | --- |\n| baz | bim |'} />)

    expect(screen.toJSON()).toMatchObject({
      type: 'Text',
      children: [
        {
          type: 'View',
          children: [
            {
              type: 'Text',
              children: ['foo'],
            },
            {
              type: 'Text',
              children: ['bar'],
            },
          ],
        },
        {
          type: 'View',
          children: [
            {
              type: 'Text',
              children: ['baz'],
            },
            {
              type: 'Text',
              children: ['bim'],
            },
          ],
        },
      ],
    })
  })

  it('task list', () => {
    render(<Mdx content={'- [x] foo\n- [ ] bar'} />)

    expect(screen.toJSON()).toMatchObject({
      type: 'Text',
      children: [
        {
          type: 'View',
          children: [
            {
              type: 'View',
              children: [
                { type: 'View' },
                { type: 'Text' },
                {
                  type: 'Text',
                  children: ['foo'],
                },
              ],
            },
            {
              type: 'View',
              children: [
                { type: 'View' },
                { type: 'Text' },
                {
                  type: 'Text',
                  children: ['bar'],
                },
              ],
            },
          ],
        },
      ],
    })
  })

  it('autolinks', () => {
    render(<Mdx content='www.example.com, https://example.com, and contact@example.com.' />)

    expect(screen.toJSON()).toMatchObject({
      type: 'Text',
      children: [
        {
          type: 'Text',
          props: { role: 'link' },
          children: ['www.example.com'],
        },
        ', ',
        {
          type: 'Text',
          props: { role: 'link' },
          children: ['https://example.com'],
        },
        ', and ',
        {
          type: 'Text',
          props: { role: 'link' },
          children: ['contact@example.com'],
        },
        '.',
      ],
    })
  })

  it('footnotes', () => {
    render(<Mdx content={'Content[^1]\n[^1]: [Note](url)'} />)

    expect(screen.toJSON()).toMatchObject({
      type: 'Text',
      children: [
        'Content',
        {
          type: 'View',
          children: [
            {
              type: 'Text',
              children: ['1'],
            },
          ],
        },
        '\n',
        {
          type: 'Text',
          children: ['Footnotes'],
        },
        {
          type: 'Text',
          children: ['\n'],
        },
        {
          type: 'Text',
          children: ['\n'],
        },
        {
          type: 'Text',
          children: ['\n'],
        },
        {
          type: 'Text',
          props: { role: 'link' },
          children: ['Note'],
        },
        {
          type: 'Text',
          children: [' '],
        },
        {
          type: 'Text',
          props: { role: 'link' },
          children: ['↩'],
        },
        {
          type: 'Text',
          children: ['\n'],
        },
        {
          type: 'Text',
          children: ['\n'],
        },
        {
          type: 'Text',
          children: ['\n'],
        },
      ],
    })
  })
})

it('demo', () => {
  render(<Mdx content={readFileSync(`${__dirname}/markdown.md`).toString()} />)

  const children = JSON.parse(JSON.stringify(screen.toJSON().children)) as any[]

  const snapshot = [
    {
      type: 'Text',
      props: { accessibilityRole: 'header' },
      children: ['H1'],
    },
    '\n',
    {
      type: 'Text',
      props: { accessibilityRole: 'header' },
      children: ['H2'],
    },
    '\n',
    {
      type: 'Text',
      props: { accessibilityRole: 'header' },
      children: ['H3'],
    },
    '\n',
    {
      type: 'Text',
      props: { accessibilityRole: 'header' },
      children: ['H4'],
    },
    '\n',
    {
      type: 'Text',
      props: { accessibilityRole: 'header' },
      children: ['H5'],
    },
    '\n',
    {
      type: 'Text',
      props: { accessibilityRole: 'header' },
      children: ['H6'],
    },
    '\n',
    {
      type: 'Text',
      children: ['Emphasis'],
    },
    '\n',
    {
      type: 'Text',
      children: ['**Bold** __Bold__'],
    },
    ' => ',
    { type: 'Text', children: ['Bold'] },
    ' ',
    { type: 'Text', children: ['Bold'] },
    '\n',
    {
      type: 'Text',
      children: ['*Italic* _Italic_'],
    },
    ' => ',
    { type: 'Text', children: ['Italic'] },
    ' ',
    { type: 'Text', children: ['Italic'] },
    '\n',
    {
      type: 'Text',
      children: ['~~Strikethrough~~'],
    },
    ' => ',
    {
      type: 'Text',
      children: ['Strikethrough'],
    },
    '\n',
    {
      type: 'Text',
      children: ['**Bold and _nested italic_**'],
    },
    ' => ',
    {
      type: 'Text',
      children: ['Bold and ', { type: 'Text', children: ['nested italic'] }],
    },
    '\n',
    {
      type: 'Text',
      children: ['***All bold and italic***'],
    },
    ' => ',
    {
      type: 'Text',
      children: [{ type: 'Text', children: ['All bold and italic'] }],
    },
    '\n',
    {
      type: 'Text',
      children: ['Quoting and Code'],
    },
    '\n',
    { type: 'View', children: [{ type: 'Text', children: ['Quoting text'] }] },
    '\n',
    'Quoting ',
    { type: 'Text', children: ['code'] },
    '\n',
    {
      type: 'View',
      children: [
        {
          type: 'Text',
          children: [
            {
              type: 'Text',
              children: ['const'],
            },
            ' a = ',
            { type: 'Text', children: ['1'] },
            '\n',
          ],
        },
      ],
    },
    '\n',
    {
      type: 'Text',
      children: ['Link'],
    },
    '\n',
    {
      type: 'Text',
      children: ['Inner link'],
    },
    '\n',
    { type: 'Text', props: { role: 'link' }, children: ['Javascript'] },
    '\n',
    {
      type: 'Text',
      children: ['Outer link'],
    },
    '\n',
    { type: 'Text', props: { role: 'link' }, children: ['Github'] },
    '\n',
    {
      type: 'Text',
      children: ['Image'],
    },
    '\n',
    { type: 'Image', props: { src: 'https://placekitten.com/100/100', alt: 'image' }, children: null },
    '\n',
    {
      type: 'Text',
      children: ['List'],
    },
    '\n',
    {
      type: 'Text',
      children: ['Normal list'],
    },
    '\n',
    {
      type: 'View',
      children: [
        { type: 'Text', children: ['Normal list'] },
        { type: 'Text', children: ['Normal list'] },
        { type: 'Text', children: ['Normal list'] },
      ],
    },
    '\n',
    {
      type: 'Text',
      children: ['Numberic list'],
    },
    '\n',
    {
      type: 'View',
      children: [
        { type: 'Text', children: ['1. Numberic list'] },
        { type: 'Text', children: ['2. Numberic list'] },
        { type: 'Text', children: ['3. Numberic list'] },
      ],
    },
    '\n',
    {
      type: 'Text',
      children: ['Nested list'],
    },
    '\n',
    {
      type: 'View',
      children: [
        {
          type: 'View',
          children: [
            { type: 'Text', children: ['Nested list'] },
            {
              type: 'View',
              children: [
                {
                  type: 'View',
                  children: [
                    {
                      type: 'View',
                      children: [
                        { type: 'Text', children: ['Nested list'] },
                        {
                          type: 'View',
                          children: [
                            {
                              type: 'View',
                              children: [{ type: 'Text', children: ['Nested list'] }],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    '\n',
    {
      type: 'Text',
      children: ['Task list'],
    },
    '\n',
    {
      type: 'View',
      children: [
        {
          type: 'View',
          children: [
            { type: 'View', children: null },
            { type: 'Text', children: [' '] },
            { type: 'Text', children: ['Task list'] },
          ],
        },
        {
          type: 'View',
          children: [
            { type: 'View', children: null },
            { type: 'Text', children: [' '] },
            { type: 'Text', children: ['Task list'] },
          ],
        },
      ],
    },
    '\n',
    {
      type: 'Text',
      children: ['Table'],
    },
    '\n',
    {
      type: 'View',
      children: [
        { type: 'Text', props: {}, children: ['th'] },
        { type: 'Text', props: {}, children: ['th'] },
      ],
    },
    {
      type: 'View',
      children: [
        { type: 'Text', props: {}, children: ['td'] },
        { type: 'Text', props: {}, children: ['td'] },
      ],
    },
    '\n',
    {
      type: 'Text',
      props: { accessibilityRole: 'header' },
      children: ['Footnote'],
    },
    '\n',
    'A',
    { type: 'View', children: [{ type: 'Text', props: { role: 'link' }, children: ['1'] }] },
    ' footnote',
    { type: 'View', children: [{ type: 'Text', props: { role: 'link' }, children: ['2'] }] },
    '\n',
    {
      type: 'Text',
      props: { accessibilityRole: 'header' },
      children: ['Footnotes'],
    },
    {
      type: 'Text',
      children: ['\n'],
    },
    {
      type: 'Text',
      children: ['\n'],
    },
    {
      type: 'Text',
      children: ['\n'],
    },
    {
      type: 'Text',
      children: ['1st footnote. '],
    },
    {
      type: 'Text',
      props: {
        role: 'link',
      },
      children: ['↩'],
    },
    {
      type: 'Text',
      children: ['\n'],
    },
    {
      type: 'Text',
      children: ['\n'],
    },
    {
      type: 'Text',
      children: ['\n'],
    },
    {
      type: 'Text',
      children: ['2nd footnote. '],
    },
    {
      type: 'Text',
      props: {
        role: 'link',
      },
      children: ['↩'],
    },
    {
      type: 'Text',
      children: ['\n'],
    },
    {
      type: 'Text',
      children: ['\n'],
    },
    {
      type: 'Text',
      children: ['\n'],
    },
  ]

  for (const [index, child] of children.entries()) {
    console.log(index, child, snapshot[index])

    if (typeof child === 'string') expect(child).toBe(snapshot[index])
    else expect(child).toMatchObject(snapshot[index])
  }
})
