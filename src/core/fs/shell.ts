import FileNode from './file-node';

export default class Shell {
  public version: string = '0.1.0';
  private current: FileNode = new FileNode();
  private root: FileNode = new FileNode();

  public mkdir(name: string, created: string): FileNode {
    this.root.type = 'dir';
    this.root.name = name;
    this.root.created = created;
    this.current = this.root;
    return this.root;
  }

  public cat(file: string): string {
    let files = this.current.children.filter(e => e.name === file && e.type === 'file');
    if (files.length > 0) return files[0].content;
    else throw new Error('No such file');
  }

  public rm(name: string): void {
    for (let i = 0; i < this.current.children.length; i++) {
      let node = this.current.children[i];
      if (node.name === name) {
        if (node.type === 'dir') throw new Error('Cannot remove directory');
        this.current.children.splice(i, 1);
        return;
      }
    }
    throw new Error('No such file');
  }

  public rmdir(name: string): void {
    for (let i = 0; i < this.current.children.length; i++) {
      let node = this.current.children[i];
      if (node.name === name) {
        if (node.type === 'file') throw new Error('No such directory');
        this.current.children.splice(i, 1);
        return;
      }
    }
  }

  public cd(path: string): void {
    let parts = path.split('/');
    let dirname = parts.shift();

    if (dirname === '.') return;
    if (dirname === '..') {
      this.current = this.current.parent !== null ? this.current.parent : this.current;
      return;
    }

    let next = this.current.children.filter(e => e.name === dirname && e.type === 'dir');
    if (next.length === 1) {
      this.current = next[0];
      if (parts.length > 0) {
        this.cd(parts.join('/'));
      }
    }
    else {
      throw new Error('No such directory');
    }
  }

  public ls(): Array<FileNode> {
    let current = new FileNode();
    current.name = '.';
    current.created = this.current.created;
    current.type = 'dir';

    if (this.current.parent == null) {
      return [current].concat(this.current.children);
    }

    let parent = new FileNode();
    parent.name = '..';
    parent.created = this.current.parent.created;
    parent.type = 'dir';

    return [current, parent].concat(this.current.children);
  }

  public pwd() {
    let find = (target: FileNode, current: FileNode, acc: Array<FileNode>): Array<FileNode> => {
      if (current.id === target.id) return acc;

      for (let i = 0; i < current.children.length; i++) {
        let child = current.children[i];
        let temp = find(target, child, acc.concat(child));
        if (temp.length > 0) return temp;
      }
      return [];
    };
    let items = find(this.current, this.root, []);
    return `${this.root.name}/` + items.map(e => e.name).join('/');
  }
}