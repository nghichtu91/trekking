export const categories = {
  categoryFollowId: {
    2000: {
      id: 2000,
      name: 'Xe cộ',
      name_url: 'mua-ban-xe',
    },
    2001: {
      id: 2001,
      name: 'Ô tô',
      name_url: 'mua-ban-xe-oto',
      parent: 2000,
    },
  },
  categoryFollowUrl: {
    'mua-ban-xe': {
      id: 2000,
      name: 'Xe cộ',
      name_url: 'mua-ban-xe',
    },
    'mua-ban-xe-oto': {
      id: 2001,
      name: 'Xe cộ',
      name_url: 'mua-ban-xe-oto',
      parent: 2000,
    },
  },
}
