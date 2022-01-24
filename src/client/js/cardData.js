import { getFetcher } from './api';
import { CARD_VIEW_TYPES } from './constant';

export default class CardModel {
  data = [];

  constructor() {
    
  }

  setState(nextState) {
    this.data = nextState;
  }

  getNavData(path = '') {
    return getFetcher(path)
    .then(res => {
      if (path === CARD_VIEW_TYPES.STUDY) { 
        return res.studies;
      }
      if (path === CARD_VIEW_TYPES.INTERVIEW) { 
        return res.interviews;
      }
      if (path === CARD_VIEW_TYPES.PROJECT) { 
        return res.projects;
      }
      return new Error('지원하지 않는 타입의 데이터입니다.');
    })
    .catch(err => {
      console.error(err);
    })
  }

  getAllData() {
    return getFetcher('')
    .then(res => {
      return res.studies;
    })
    .catch(err => {
      console.error(err);
    }) 
  }
}
