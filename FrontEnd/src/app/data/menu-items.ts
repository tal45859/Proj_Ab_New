import { Menultem } from "../model/menultem";

export const items: Array<Menultem> = [
  {
    name: 'דף הבית',
    url: 'Home',
    isshow: true
  },
  {
    name: 'גלריה',
    url: 'Post/AllPosts',
    isshow: false
  }
];


export const User: Array<Menultem> = [
  {
    name: 'דף הבית',
    url: 'Home',
    isshow: true
  },
  {
    name: 'גלריה',
    url: 'Post/AllPosts',
    isshow: false
  },
  {
    name: 'הודעות',
    url: 'AllMessage',
    isshow: false
  },
  {
    name: 'אזור אישי',
    url: 'User/Details',
    isshow: false
  }

];

export const Admin: Array<Menultem> = [
  {
    name: 'דף הבית',
    url: 'Home',
    isshow: true
  },
  {
    name: 'גלריה',
    url: 'Post/AllPosts',
    isshow: false
  },
  {
    name: 'הודעות',
    url: 'AllMessage',
    isshow: false
  },
  {
    name: 'אזור מנהל',
    url: 'User/Details',
    isshow: false
  }
];
