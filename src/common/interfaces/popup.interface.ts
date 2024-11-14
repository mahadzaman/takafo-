export enum PopupSize {
  sm = '478px',
  md = '780px',
}

export interface PopupConfiguration<TItem> {
  deleteCallback?: (item: TItem) => Promise<boolean | void>;
  popupSize?: PopupSize;
}
