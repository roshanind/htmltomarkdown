// turndown-plugin-gfm.d.ts
declare module 'turndown-plugin-gfm' {
  import TurndownService from 'turndown';

  // Assuming gfm is a function that takes a TurndownService instance and returns void
  export function gfm(service: TurndownService): void;

  // export table gfm
  export function tables(service: TurndownService): void;

  // If there are more exports, declare them here
}
