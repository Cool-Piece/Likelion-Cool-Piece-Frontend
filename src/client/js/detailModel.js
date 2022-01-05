import { getFetcher } from './api';

export default class DetailModel {
  constructor() {
    this.detailPageID = localStorage.getItem('detailPageId');
  }

  getData() {
    return getFetcher(this.detailPageID);
  }
}