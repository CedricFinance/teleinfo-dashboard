module.exports = {
  activemq: {
    alias: 'mq',
    user: process.env.ACTIVEMQ_USER,
    pass: process.env.ACTIVEMQ_PASSWORD,
    port: 61613,
    destination: '/topic/electricity/metrics',
  },
  mongo: {
    url: 'mongodb://mongo/electricity'
  }
};
