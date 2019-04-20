import prepare from 'mocha-prepare';
import mongoUnit from 'mongo-unit';

prepare((done) => mongoUnit.start()
  .then((mongoURL) => {
    process.env.MONGO_URL = mongoURL;
    done();
  })
);
