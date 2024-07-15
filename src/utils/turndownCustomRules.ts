import TurndownService from 'turndown';

interface Rules {
  [key: string]: TurndownService.Rule;
}

const indexOf = Array.prototype.indexOf;
const every = Array.prototype.every;
const rules: Rules = {};

rules.tableCell = {
  filter: ['th', 'td'],
  replacement: function (content: string, node: TurndownService.Node): string {
    return cell(content, node);
  },
};

rules.tableRow = {
  filter: 'tr',
  replacement: function (content: string, node: TurndownService.Node): string {
    let borderCells = '';
    const alignMap: { [key: string]: string } = { left: ':--', right: '--:', center: ':-:' };

    if (isHeadingRow(node)) {
      for (let i = 0; i < node.childNodes.length; i++) {
        let border = '---';
        const align = (node.childNodes[i] as Element).getAttribute('align')?.toLowerCase() || '';

        if (align) border = alignMap[align] || border;

        borderCells += cell(border, node.childNodes[i] as TurndownService.Node);
      }
    } else if (isNoHeadingRow(node)) {
      for (let i = 0; i < node.childNodes.length; i++) {
        borderCells += cell('---', node.childNodes[i] as TurndownService.Node);
      }
    }
    return '\n' + content + (borderCells ? '\n' + borderCells : '');
  },
};

rules.table = {
  filter: 'table',
  replacement: function (content: string): string {
    content = content.replace('\n\n', '\n');
    return '\n\n' + content + '\n\n';
  },
};

rules.tableSection = {
  filter: ['thead', 'tbody', 'tfoot'],
  replacement: function (content: string): string {
    return content;
  },
};

rules.break = {
  filter: ['br'],
  replacement: function (content: string, node: TurndownService.Node): string {
    if ((node as Element).closest('td') || (node as Element).closest('th')) {
      return content;
    }

    return '\n';
  },
};

rules.pre = {
  filter: ['pre'],
  replacement: function (_, node: TurndownService.Node): string {
    const innerContent = `${(node as Element).textContent}`;
    (node as Element).innerHTML = '';
    return '\n' + '```\n' + innerContent + '\n```' + '\n';
  },
};

rules.img = {
  filter: ['img'],
  replacement: function (_, node: TurndownService.Node): string {
    if ((node as Element).closest('a')) {
      return `![${(node as Element).getAttribute('alt')}](${(node as Element).getAttribute('src')})`;
    }

    return `\n![${(node as Element).getAttribute('alt')}](${(node as Element).getAttribute('src')})\n`;
  },
};

rules.anchor = {
  filter: ['a'],
  replacement: function (content: string, node: TurndownService.Node): string {
    return `[${content.trim()}](${(node as Element).getAttribute('href')})`;
  },
};

function isHeadingRow(tr: TurndownService.Node): boolean {
  const parentNode = tr.parentNode as TurndownService.Node;
  return (
    parentNode.nodeName === 'THEAD' ||
    (parentNode.firstChild === tr &&
      (parentNode.nodeName === 'TABLE' || isFirstTbody(parentNode)) &&
      every.call(tr.childNodes, function (n: TurndownService.Node): boolean {
        return n.nodeName === 'TH';
      }))
  );
}

function isNoHeadingRow(tr: TurndownService.Node): boolean {
  const parentNode = tr.parentNode as TurndownService.Node;
  let tableNode = null;

  if (parentNode.nodeName === 'TABLE') {
    tableNode = parentNode;
  } else if (isFirstTbody(parentNode)) {
    tableNode = parentNode.parentNode;
  }

  // check tableNode has 'added-header' class name
  if ((tableNode as HTMLTableElement)?.classList.contains('added-header')) {
    return false;
  } else {
    // add 'added-header' class name to the tableNode
    (tableNode as HTMLTableElement).classList.add('added-header');
    return true;
  }
}

function isFirstTbody(element: TurndownService.Node): boolean {
  const previousSibling = element.previousSibling as TurndownService.Node;
  return (
    element.nodeName === 'TBODY' &&
    (!previousSibling || (previousSibling.nodeName === 'THEAD' && /^\s*$/i.test(previousSibling.textContent || '')))
  );
}

function cell(content: string, node: TurndownService.Node): string {
  const index = indexOf.call(node.parentNode?.childNodes, node);
  let prefix = ' ';
  if (index === 0) prefix = '| ';
  return prefix + content + ' |';
}

export default function customRules(turndownService: TurndownService): void {
  turndownService.keep(function (node: TurndownService.Node): boolean {
    return node.nodeName === 'TABLE' && !isHeadingRow((node as HTMLTableElement).rows[0]);
  });
  for (const key in rules) turndownService.addRule(key, rules[key]);
}
