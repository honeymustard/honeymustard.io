import { v4 as uuid } from 'uuid';

export class FileNode {
  public id: string = '';
  public type: string = '';
  public name: string = '';
  public content: string = '';
  public created: string = '';
  public parent: FileNode = null as any;
  public children: Array<FileNode> = [];

  constructor(init?: Partial<FileNode>) {
    this.id = uuid();
    Object.assign(this, init);
  }

  public mkdir(name: string, created: string): FileNode {
    let node = new FileNode();
    node.type = 'dir';
    node.name = name;
    node.created = created;
    node.parent = this;
    this.children.push(node);
    return node;
  }

  public touch(name: string, created: string, content: string): FileNode {
    let node = new FileNode();
    node.type = 'file';
    node.name = name;
    node.created = created;
    node.content = content;
    node.parent = this;
    this.children.push(node);
    return this;
  }
}

export class FileSystem {
  public current: FileNode = new FileNode();
  public root: FileNode = new FileNode();

  public mkdir(name: string, created: string): FileNode {
    this.root.type = 'dir';
    this.root.name = name;
    this.root.created = created;
    this.current = this.root;
    return this.root;
  }
}