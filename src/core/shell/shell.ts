import { FileNode, FileSystem } from './fs';

export default class Shell {
  public version: string = '0.1.0';
  public fs: FileSystem = new FileSystem();

  public cat(name: string): string {
    let index = this.fs.current.children.findIndex(e => e.name === name && e.type === 'file');
    if (index !== -1) return this.fs.current.children[index].content;
    else throw new Error('No such file');
  }

  public rm(name: string): void {
    let index = this.fs.current.children.findIndex(e => e.name === name && e.type === 'file');
    if (index !== -1) this.fs.current.children.splice(index, 1);
    else throw new Error('No such file');
  }

  public rmdir(name: string): void {
    if (/[^a-zA-z0-9\.\-\+]/.test(name) || ['.', '..'].indexOf(name) !== -1) throw new Error('Invalid directory name');
    let index = this.fs.current.children.findIndex(e => e.name === name && e.type === 'dir');
    if (index !== -1) this.fs.current.children.splice(index, 1);
    else throw new Error('No such directory');
  }

  public mkdir(name: string, created: string): void {
    if (/[^a-zA-z0-9\.\-\+]/.test(name) || ['.', '..'].indexOf(name) !== -1) throw new Error('Invalid directory name');
    let index = this.fs.current.children.findIndex(e => e.name === name && e.type === 'dir');
    if (index !== -1) throw new Error('Directory already exists');
    else this.fs.current.mkdir(name, created);
  }

  public cd(path: string): void {
    let parts = path.split('/');
    let name = parts.shift();

    if (name === '.') return;
    if (name === '..') {
      this.fs.current = this.fs.current.parent !== null ? this.fs.current.parent : this.fs.current;
      return;
    }

    let index = this.fs.current.children.findIndex(e => e.name === name && e.type === 'dir');
    if (index !== -1) {
      this.fs.current = this.fs.current.children[index];
      if (parts.length > 0) {
        this.cd(parts.join('/'));
      }
    }
    else throw new Error('No such directory');
  }

  public ls(): Array<FileNode> {
    let current = new FileNode();
    current.name = '.';
    current.created = this.fs.current.created;
    current.type = 'dir';

    if (this.fs.current.parent == null) {
      return [current].concat(this.fs.current.children);
    }

    let parent = new FileNode();
    parent.name = '..';
    parent.created = this.fs.current.parent.created;
    parent.type = 'dir';

    return [current, parent].concat(this.fs.current.children);
  }

  public pwd() {
    let node = this.fs.current;
    let acc = [];
    while (node !== null) {
      acc.push(node.name);
      node = node.parent;
    }
    return acc.reverse().join('/');
  }
}