<template>
  <div class="emulator" v-if="open">
    <div class="emulator__head">
      <h1>Honeymustard.io</h1>
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
  import Shell from '@/core/fs/shell';
  import Resume from 'raw-loader!@/static/resume.md';
  import Links from 'raw-loader!@/static/links.md';

  @Component
  export default class Emulator extends Vue {
    private open: boolean = true;
    private input: string = '';
    private lines: Array<object> = [];
    private shell: Shell = new Shell();

    constructor() {
      super();
      let home = this.shell
        .mkdir('c:', '30-09-2020')
        .mkdir('users', '30-09-2020')
        .mkdir('adrian', '02-10-2020');

      home
        .touch('resume', '02-10-2020', Resume)
        .touch('projects', '02-10-2020', '')
        .touch('links', '03-10-2020', Links);

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
            this.lines = new Array();
            break;
          case 'pwd': 
            this.pushText(this.shell.pwd());
            break;
          case 'ls':
          case 'dir':
            this.shell.ls().map(e => this.pushText(`${e.created} ${e.name}`));
            break;
          case 'help':
            this.pushText(`ls             - list directory contents`);
            this.pushText(`cd [directory] - move into directory`);
            this.pushText(`cat [filename] - show contents of file`);
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
            throw new Error('Not implemented');
            break;
          case 'touch':
            throw new Error('Not implemented');
            break;
          case 'cat':
            this.shell.cat(args[1]).split('\n').forEach(l => {
              if (l.startsWith('http')) this.pushLink(l);
              else this.pushText(l);
            });
            break;
          case 'version':
            this.pushText(this.shell.version);
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
    height: 495px;
    border-radius: 10px;
    flex-direction: column;
    box-shadow: 0px 20px 40px -20px #000a;
    display: grid;
    grid-template-rows: 32px auto 38px;
    row-gap: 10px;
    padding: 10px;

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
      font-size: 20px;
      font-weight: 400;
      margin: 0;
    }

    .emulator__controls {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      span {
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: $text;
        cursor: pointer;
      }
    }
  }

  .emulator__body {
    flex-grow: 1;
    overflow: auto;
    scrollbar-width: 4px;
    scrollbar-color: #222;
    margin-right: 6px;

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
    font-size: 20px;
    line-height: 1.3;
    font-weight: 400;
  }

  .emulator__link {

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
    font-family: 'Roboto Mono', serif;
    white-space: pre-wrap;
    font-size: 16px;

    .is-cwd {
      color: #fff;
    }
  }

  .emulator__user {
    color: #fff;
  }

  .emulator__foot {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: auto minmax(0, 1fr) 6px;
  }

  .emulator__pwd {
    display: flex;
    align-items: center;
    font-family: 'Roboto Mono', serif;
    color: #fff;
  }

  .emulator__input {
    appearance: none;
    border: none;
    width: 100%;
    height: 37px;
    padding: 0 10px;
    background-color: #222;
    color: $text;
    font-size: 20px;
    line-height: 1;
    outline: none;
    caret-color: transparent;
    position: relative;
    border: 1px solid transparent;
    border-radius: 3px;

    &:hover {
      border-color: #444;
    }
  }
</style>