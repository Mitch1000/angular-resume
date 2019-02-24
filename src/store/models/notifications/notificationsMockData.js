export default function() {

  return new Promise((resolve, reject) => {
    const response = {
      data: {
        notifications: [],
        is_paginating: false,
      },
    };

    response.data.notifications = [
      {
        id: 15,
        user_id: 1,
        name: 'This is an demo of a notifications dropdown I created myself.',
        description: 'In reality these notifications would be connected to a database managed by something like Ruby on Rails.',
        thumbnail_url: 'https://lh3.googleusercontent.com/C-fQTLwl1KJ4AjhGXhiRikgrwOSW7yRaY69xIVHu-JSTwLuyviAnhvxQr4oNJOGzjPIUB7jjjQ=s1024-c-e100-v1',
        status: 'unread',
        time_since_created: '1 minute ago',
      },
      {
        id: 14,
        user_id: 1,
        name: 'Please browse the site for more demos I have created.',
        description: 'I am doing my best to update this site with features I have created in the past.',
        thumbnail_url: 'https://lh4.ggpht.com/zttupNtcwZOOiFJOLc5N32ez4JtEu2JOcho0pEk65QlqpCobw7_bSa-et5VSJBYul-f7Vk214m0=s1024-c-e100-v1',
        status: 'unread',
        time_since_created: '5 minutes ago',
      },
      {
        id: 13,
        user_id: 1,
        name: 'This feature was created with Vue and VueX.',
        description: 'Vue is a fancy javascript tool for structuring javascript code to make it easier for developers to undertand.',
        thumbnail_url: 'https://lh3.googleusercontent.com/G0LPgic_kOzCzPOpqj7zB9jtn04M6p5fon-N7bFzzVuXHQLGBIe4mV28Jve5y_WFPx_OTjkAkw=s1024-c-e100-v1',
        status: 'unread',
        time_since_created: '10 minutes ago',
      },
      {
        id: 12,
        user_id: 1,
        name: 'This dropdown includes pagination.',
        description: 'This means more notifications will load as you scroll down!',
        thumbnail_url: 'https://lh3.googleusercontent.com/eeMglHTjadlGlprx0iI_GqJis6jZ36WL2QBhr6MOwuTeCEEhWdCPr-bUbgjc0Hb-TcHM1C_j=s1024-c-e100-v1',
        status: 'read',
        time_since_created: '1 month ago',
      },
      {
        id: 11,
        user_id: 1,
        name: 'Some of my hobbies include:',
        description: 'Going for drinks with friends, board games, going for nature walks, camping, playing the piano...',
        thumbnail_url: 'https://lh4.ggpht.com/-FoMlj5vtq9IzA60338URJTKePmkSADvSpNVGdW_AFATytcrQllCeHQLb58xVnTti85QIT4jYw=s1024-c-e100-v1',
        status: 'read',
        time_since_created: '2 months ago',
      },
    ];

    resolve(response);
  })
};
