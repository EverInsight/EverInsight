import { render, screen } from '@testing-library/react-native'
import { MdxContent } from '../content'
import { readFileSync } from 'node:fs'

// https://spec.commonmark.org/
describe('commonmark', () => {
  describe('leaf block', () => {
    describe('thematic breaks', () => {
      it('***', () => {
        render(<MdxContent content='***' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'View',
          children: null,
        })
      })

      it('---', () => {
        render(<MdxContent content='---' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'View',
          children: null,
        })
      })

      it('___', () => {
        render(<MdxContent content='___' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'View',
          children: null,
        })
      })
    })

    describe('atx headings', () => {
      it('#', () => {
        render(<MdxContent content='# h1' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: ['h1'],
        })
      })

      it('##', () => {
        render(<MdxContent content='## h2' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: ['h2'],
        })
      })

      it('###', () => {
        render(<MdxContent content='### h3' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: ['h3'],
        })
      })

      it('####', () => {
        render(<MdxContent content='#### h4' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: ['h4'],
        })
      })

      it('#####', () => {
        render(<MdxContent content='##### h5' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: ['h5'],
        })
      })

      it('######', () => {
        render(<MdxContent content='###### h6' />)

        expect(screen.toJSON()).toMatchObject({
          type: 'Text',
          children: ['h6'],
        })
      })
    })

    it('setext headings', () => {
      render(<MdxContent content='# Foo *bar*' />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        props: { accessibilityRole: 'header' },
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
      render(<MdxContent content={'```\ncode\n```'} />)

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
      render(<MdxContent content={'> line1\n>\n> line2'} />)

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
        render(<MdxContent content={'- item1\n- item2'} />)

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
        render(<MdxContent content={'- item1\n  - item1-1\n- item2'} />)

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
        render(<MdxContent content={'1. item1\n2. item2'} />)

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
        render(<MdxContent content={'1. item1\n  1. item1-1\n2. item2'} />)

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
      render(<MdxContent content='`code`' />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        children: ['code'],
      })
    })

    it('strong', () => {
      render(<MdxContent content='**strong**' />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        children: ['strong'],
      })
    })

    it('emphasis', () => {
      render(<MdxContent content='_emphasis_' />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        children: ['emphasis'],
      })
    })

    it('del', () => {
      render(<MdxContent content='~~del~~' />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        children: ['del'],
      })
    })

    it('links', () => {
      render(<MdxContent content='[title](link)' />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        props: { role: 'link' },
        children: ['title'],
      })
    })

    it('images', () => {
      render(<MdxContent content='![title](link)' />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Image',
        props: { src: 'link', alt: 'title' },
      })
    })

    it('image with link', () => {
      render(<MdxContent content='[![title](img)](url)' />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        children: [
          {
            type: 'Image',
            props: { src: 'img', alt: 'title' },
          },
        ],
      })
    })

    it('hard line breaks', () => {
      render(<MdxContent content={'Hello  \nWorld'} />)

      expect(screen.toJSON()).toMatchObject([
        {
          type: 'Text',
          children: ['Hello'],
        },
        { type: 'Text' },
        { type: 'Text' },
        { type: 'Text', children: ['World'] },
      ])
    })

    it('soft line breaks', () => {
      render(<MdxContent content={'Hello\nWorld'} />)

      expect(screen.toJSON()).toMatchObject({
        type: 'Text',
        children: ['Hello\nWorld'],
      })
    })
  })
})

// https://github.github.com/gfm/
describe('gfm', () => {
  it('table', () => {
    render(<MdxContent content={'| foo | bar |\n| --- | --- |\n| baz | bim |'} />)

    expect(screen.toJSON()).toMatchObject([
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
    ])
  })

  it('task list', () => {
    render(<MdxContent content={'- [x] foo\n- [ ] bar'} />)

    expect(screen.toJSON()).toMatchObject({
      type: 'View',
      children: [
        {
          type: 'View',
          children: [
            { type: 'View' },
            { type: 'Text', children: [' '] },
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
            { type: 'Text', children: [' '] },
            {
              type: 'Text',
              children: ['bar'],
            },
          ],
        },
      ],
    })
  })

  it('autolinks', () => {
    render(<MdxContent content='www.example.com, https://example.com, and contact@example.com.' />)

    expect(screen.toJSON()).toMatchObject([
      {
        type: 'Text',
        props: { role: 'link' },
        children: ['www.example.com'],
      },
      {
        type: 'Text',
        children: [', '],
      },
      {
        type: 'Text',
        props: { role: 'link' },
        children: ['https://example.com'],
      },
      {
        type: 'Text',
        children: [', and '],
      },
      {
        type: 'Text',
        props: { role: 'link' },
        children: ['contact@example.com'],
      },
      {
        type: 'Text',
        children: ['.'],
      },
    ])
  })

  it('footnotes', () => {
    render(<MdxContent content={'Content[^1]\n[^1]: [Note](url)'} />)

    expect(screen.toJSON()).toMatchObject([
      {
        type: 'Text',
        children: ['Content'],
      },
      {
        type: 'View',
        children: [
          {
            type: 'Text',
            children: ['1'],
          },
        ],
      },
      {
        type: 'Text',
        children: null,
      },
      {
        type: 'Text',
        children: ['Footnotes'],
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
    ])
  })
})

it('demo', () => {
  render(<MdxContent content={readFileSync(`${__dirname}/markdown.md`).toString()} />)

  const children = JSON.parse(JSON.stringify(screen.toJSON())) as any[]

  const snapshot = [
    {
      type: 'Text',
      props: { accessibilityRole: 'header' },
      children: ['H1'],
    },
    { type: 'Text', children: null },
    {
      type: 'Text',
      props: { accessibilityRole: 'header' },
      children: ['H2'],
    },
    { type: 'Text', children: null },
    {
      type: 'Text',
      props: { accessibilityRole: 'header' },
      children: ['H3'],
    },
    { type: 'Text', children: null },
    {
      type: 'Text',
      props: { accessibilityRole: 'header' },
      children: ['H4'],
    },
    { type: 'Text', children: null },
    {
      type: 'Text',
      props: { accessibilityRole: 'header' },
      children: ['H5'],
    },
    { type: 'Text', children: null },
    {
      type: 'Text',
      props: { accessibilityRole: 'header' },
      children: ['H6'],
    },
    { type: 'Text', children: null },
    {
      type: 'Text',
      children: ['Emphasis'],
    },
    { type: 'Text', children: null },
    {
      type: 'Text',
      children: ['**Bold** __Bold__'],
    },
    { type: 'Text', children: [' => '] },
    { type: 'Text', children: ['Bold'] },
    { type: 'Text', children: [' '] },
    { type: 'Text', children: ['Bold'] },
    { type: 'Text', children: null },
    {
      type: 'Text',
      children: ['*Italic* _Italic_'],
    },
    { type: 'Text', children: [' => '] },
    { type: 'Text', children: ['Italic'] },
    { type: 'Text', children: [' '] },
    { type: 'Text', children: ['Italic'] },
    { type: 'Text', children: null },
    {
      type: 'Text',
      children: ['~~Strikethrough~~'],
    },
    { type: 'Text', children: [' => '] },
    {
      type: 'Text',
      children: ['Strikethrough'],
    },
    { type: 'Text', children: null },
    {
      type: 'Text',
      children: ['**Bold and _nested italic_**'],
    },
    { type: 'Text', children: [' => '] },
    {
      type: 'Text',
      children: ['Bold and ', { type: 'Text', children: ['nested italic'] }],
    },
    { type: 'Text', children: null },
    {
      type: 'Text',
      children: ['***All bold and italic***'],
    },
    { type: 'Text', children: [' => '] },
    {
      type: 'Text',
      children: [{ type: 'Text', children: ['All bold and italic'] }],
    },
    { type: 'Text', children: null },
    {
      type: 'Text',
      children: ['<sup>sup</sup> and <sub>sub</sub>'],
    },
    { type: 'Text', children: [' => '] },
    { type: 'Text', children: ['sup'] },
    { type: 'Text', children: [' and '] },
    { type: 'Text', children: ['sub'] },
    { type: 'Text', children: null },
    {
      type: 'Text',
      children: ['Quoting and Code'],
    },
    { type: 'Text', children: null },
    { type: 'View', children: [{ type: 'Text', children: ['Quoting text'] }] },
    { type: 'Text', children: null },
    { type: 'Text', children: ['Quoting '] },
    { type: 'Text', children: ['code'] },
    { type: 'Text', children: null },
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
    { type: 'Text', children: null },
    {
      type: 'Text',
      children: ['Link'],
    },
    { type: 'Text', children: null },
    {
      type: 'Text',
      children: ['Inner link'],
    },
    { type: 'Text', children: null },
    { type: 'Text', props: { role: 'link' }, children: ['Javascript'] },
    { type: 'Text', children: null },
    {
      type: 'Text',
      children: ['Outer link'],
    },
    { type: 'Text', children: null },
    { type: 'Text', props: { role: 'link' }, children: ['Github'] },
    { type: 'Text', children: null },
    {
      type: 'Text',
      children: ['Image'],
    },
    { type: 'Text', children: null },
    { type: 'Image', props: { src: 'https://placekitten.com/100/100', alt: 'image' }, children: null },
    { type: 'Text', children: null },
    {
      type: 'Text',
      children: ['List'],
    },
    { type: 'Text', children: null },
    {
      type: 'Text',
      children: ['Normal list'],
    },
    { type: 'Text', children: null },
    {
      type: 'View',
      children: [
        { type: 'Text', children: ['Normal list'] },
        { type: 'Text', children: ['Normal list'] },
        { type: 'Text', children: ['Normal list'] },
      ],
    },
    { type: 'Text', children: null },
    {
      type: 'Text',
      children: ['Numberic list'],
    },
    { type: 'Text', children: null },
    {
      type: 'View',
      children: [
        { type: 'Text', children: ['1. Numberic list'] },
        { type: 'Text', children: ['2. Numberic list'] },
        { type: 'Text', children: ['3. Numberic list'] },
      ],
    },
    { type: 'Text', children: null },
    {
      type: 'Text',
      children: ['Nested list'],
    },
    { type: 'Text', children: null },
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
    { type: 'Text', children: null },
    {
      type: 'Text',
      children: ['Task list'],
    },
    { type: 'Text', children: null },
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
    { type: 'Text', children: null },
    {
      type: 'Text',
      children: ['Table'],
    },
    { type: 'Text', children: null },
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
    { type: 'Text', children: null },
    {
      type: 'Text',
      props: { accessibilityRole: 'header' },
      children: ['Footnote'],
    },
    { type: 'Text', children: null },
    { type: 'Text', children: ['A'] },
    { type: 'View', children: [{ type: 'Text', props: { role: 'link' }, children: ['1'] }] },
    { type: 'Text', children: [' footnote'] },
    { type: 'View', children: [{ type: 'Text', props: { role: 'link' }, children: ['2'] }] },
    { type: 'Text', children: null },
    {
      type: 'Text',
      props: { accessibilityRole: 'header' },
      children: ['Footnotes'],
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
      children: ['2nd footnote. '],
    },
    {
      type: 'Text',
      props: {
        role: 'link',
      },
      children: ['↩'],
    },
  ]

  for (const [index, child] of children.entries()) {
    // console.log(index, child, snapshot[index])

    expect(child).toMatchObject(snapshot[index])
  }
})

it('disable html', () => {
  render(<MdxContent content={'<sup>sup</sup> and <sub>sub</sub>'} />)

  expect(screen.toJSON()).toMatchObject([
    {
      type: 'Text',
      children: ['sup'],
    },
    {
      type: 'Text',
      children: [' and '],
    },
    {
      type: 'Text',
      children: ['sub'],
    },
  ])
})
