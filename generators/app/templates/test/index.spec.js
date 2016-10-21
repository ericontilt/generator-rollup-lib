import sut from '../src/index';
import chai from 'chai';

const expect = chai.expect;
chai.should();

describe('sut', function() {
  it('exposes an object with an api', function() {
    expect(sut).to.be.an('object')
      .and.to.have.all.keys('hello');
  });
});
