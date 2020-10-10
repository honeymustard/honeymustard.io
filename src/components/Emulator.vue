<template>
  <div class="emulator" v-if="open">
    <div class="emulator__head">
      <h1>Emulator</h1>
      <div class="emulator__controls">
        <span @click="open = false" title="Close emulator"></span>
      </div>
    </div>
    <div class="emulator__body" ref="body">
      <ul class="emulator__lines">
        <li class="emulator__line" v-for="(line, i) in lines" :key="i" :class="`is-${line.type}`">
          <template v-if="line.type === 'text'">
            <div class="emulator__text"><span class="is-cwd" v-if="line.cwd">{{line.cwd}}&gt; </span>{{line.text}}</div>
          </template>
          <template v-else-if="line.type === 'link'">
            <div class="emulator__link"><a :href="line.url" target="_blank">{{line.url}}</a></div>
          </template>
        </li>
      </ul>
    </div>
    <div class="emulator__foot">
      <div class="emulator__pwd">{{shell.pwd()}}&gt;</div>
      <input class="emulator__input" v-model="input" ref="input" type="text" spellcheck="false" @keydown.enter="handleInput">
    </div>
  </div>
</template>

<script lang="ts">
  import moment from 'moment';
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Shell from '@/core/shell/shell';
  import Resume from 'raw-loader!@/static/resume.md';
  import Projects from 'raw-loader!@/static/projects.md';
  import Links from 'raw-loader!@/static/links.md';
  import Stack from 'raw-loader!@/static/stack.md';
  import Horse from 'raw-loader!@/static/horse.txt';

  @Component
  export default class Emulator extends Vue {
    private open: boolean = true;
    private input: string = '';
    private lines: Array<object> = [];
    private shell: Shell = new Shell();

    constructor() {
      super();
      let home = this.shell.fs
        .mkdir('c:', '2020-09-30')
        .mkdir('users', '2020-09-30')
        .mkdir('adrian', '2020-10-02');

      home
        .touch('resume.md', '2020-10-02', Resume)
        .touch('projects.md', '2020-10-02', Projects)
        .touch('links.md', '2020-10-03', Links)
        .touch('stack.md', '2020-10-06', Stack)
        .touch('horse.txt', '2020-10-09', Horse);

      this.shell.cd('users/adrian');
    }

    public handleInput() {
      this.pushText(this.input, { cwd: this.shell.pwd() });
      this.executeCommand(this.input);
      this.input = '';

      this.$nextTick(() => {
        let element = <HTMLElement>this.$refs.body;
        element.scrollTop = element.scrollHeight;
      });
    }

    public pushText(text: string, rest: object = {}) {
      this.lines.push({ type: 'text', text, ...rest });
    }

    public pushLink(url: string) {
      this.lines.push({ type: 'link', url });
    }

    public writeCommand(command: string) {
      this.input = command;
      this.handleInput();
    }

    public executeCommand(command: string) {
      let now = moment();
      let args = command.split(' ');

      try {
        switch (args[0]) {
          case '': break;
          case 'cls':
          case 'clear':
            let last: any = this.lines.pop();
            this.lines = new Array();
            this.lines.push(last);
            break;
          case 'pwd': 
            this.pushText(this.shell.pwd());
            break;
          case 'ls':
          case 'dir':
            this.pushText(`${'created'.padEnd(12)}${'type'.padEnd(8)}name`);
            this.shell.ls()
              .map(e => this.pushText(`${e.created.padEnd(12)}${`[${e.type}]`.padEnd(8)}${e.name}`));
            break;
          case 'help':
            this.pushText(`command  param   description`);
            this.pushText(`ls               list directory contents`);
            this.pushText(`pwd              print working directory`);
            this.pushText(`clear            clear screen buffer`);
            this.pushText(`whois            show whois information`);
            this.pushText(`version          show version`);
            this.pushText(`help             show command list`);
            this.pushText(`cd       [dir]   move into directory`);
            this.pushText(`mkdir    [dir]   make directory`);
            this.pushText(`rmdir    [dir]   remove directory`);
            this.pushText(`cat      [file]  show contents of file`);
            this.pushText(`touch    [file]  create file`);
            this.pushText(`rm       [file]  remove file`);
            break;
          case 'cd':
            this.shell.cd(args[1]);
            break;
          case 'rm':
            this.shell.rm(args[1]);
            break;
          case 'rmdir':
            this.shell.rmdir(args[1]);
            break;
          case 'mkdir':
            this.shell.mkdir(args[1], moment().format('YYYY-MM-DD'));
            break;
          case 'touch':
            throw new Error('Not implemented');
            break;
          case 'cat':
            this.shell.cat(args[1]).split('\n').forEach((l, i) => {
              let n = (i + 1).toString().padEnd(3);
              if (l.startsWith('http')) this.pushText(`${n} ${l}`);
              else this.pushText(`${n} ${l}` || ' ');
            });
            break;
          case 'version':
            this.pushText(this.shell.version);
            break;
          case 'whois':
            this.pushText(`Adrian Solumsmo (${moment().diff('1988-08-23', 'years')}) <adrian.solumsmo@gmail.com>`);
            this.pushText('.NET & JavaScript developer at Dagens Næringsliv');
            break;
          case 'exit':
          case 'quit':
            this.$nextTick(() => this.open = false);
            break;
          default:
            this.pushText(`Unknown command`);
            break;
        }
      }
      catch(e) {
        this.pushText(e);
      }
    }

    mounted() {
      (<HTMLElement>this.$refs.input).focus();
      this.writeCommand('help');
    }
  }
</script>

<style scoped lang="scss">
  $text: #ff5;

  .emulator {
    background: #222;
    height: 458px;
    border-radius: 10px;
    flex-direction: column;
    box-shadow: 0px 20px 40px -20px #000a;
    display: grid;
    grid-template-rows: 30px auto 34px;
    row-gap: 6px;
    padding: 10px;

    @media (min-width: 600px) {
      height: 452px;
    }

    ::selection {
      background: #ff5;
      color: #222;
    }

    ::-moz-selection {
      background: #ff5;
      color: #222;
    }
  }

  .emulator__head {
    display: grid;
    grid-template-columns: auto 60px;
    align-items: center;
    position: relative;

    h1 {
      color: $text;
      font-family: 'Roboto Mono', monospace, sans-serif;
      font-size: 16px;
      font-weight: 400;
      margin: 0;
    }

    .emulator__controls {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: $text;
        cursor: pointer;
        transition: .2s ease;

        &:hover {
          background-color: #f59;
        }
      }
    }
  }

  .emulator__body {
    flex-grow: 1;
    overflow: auto;
    scrollbar-width: 4px;
    scrollbar-color: #222;
    margin-right: 4px;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      border: 1px solid #444;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ff5;
      border-radius: 3px;
    }
  }

  .emulator__lines {
    list-style-type: none;
    color: $text;
    padding: 0;
    margin: 0;
  }

  .emulator__link {
    word-break: break-all;

    a {
      color: #ff5;
      text-decoration: none;

      &:visited {
        color: #ff5;
      }

      &:hover {
        color: #ff5;
        text-decoration: underline;
      }
    }
  }

  .emulator__link,
  .emulator__text {
    word-break: break-word;
    font-family: 'Roboto Mono', monospace, sans-serif;
    white-space: pre-wrap;
    font-size: 15px;
    font-weight: 400;

    @media (min-width: 500px) {
      font-size: 16px;
    }

    .is-cwd {
      color: #fff;
    }
  }

  .emulator__user {
    color: #fff;
  }

  .emulator__foot {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: auto minmax(0, 1fr) 6px;
  }

  .emulator__pwd,
  .emulator__input {
    display: flex;
    align-items: center;
    font-family: 'Roboto Mono', monospace, sans-serif;
    color: #fff;
    font-size: 16px;
  }

  .emulator__input {
    appearance: none;
    border: none;
    width: 100%;
    padding: 0 6px;
    background-color: #222;
    color: $text;
    outline: none;
    caret-color: transparent;
    position: relative;
    border: 1px solid transparent;
    border-radius: 3px;

    &:hover {
      border-color: #444;
    }

    &:focus {
      border-color: #222;
    }
  }
</style>