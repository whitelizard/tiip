// KARMA TEST
// describe('tiip', function() {
//     beforeEach(module('tiip'));
//
//     it('all arguments', inject(function (tiip) { //parameter name = service name
//         expect( tiip.unpack(tiip.pack('type', 'pid', 'signal', {arg:22}, ['payload'], 'mid', 'tenant', 'source', 'sid', true)) )
//         .toEqual(jasmine.objectContaining({
//             type: 'type',
//             pid: 'pid',
//             signal: 'signal',
//             arguments: {arg:22},
//             payload: ['payload'],
//             mid: 'mid',
//             tenant: 'tenant',
//             source: 'source',
//             sid: 'sid',
//             ok: true,
//         }));
//     }));
//
// });

import { expect } from 'chai';
import * as tiip from '../lib/tiip';

const msg = tiip.unpack(
    tiip.pack('type', 'pid', 'signal', {arg:22}, ['payload'], 'mid', 'tenant', ['source'], 'sid', true)
);
expect(msg).to.have.property('type').that.is.a('string').that.equals('type');
expect(msg).to.have.property('pid').that.is.a('string').that.equals('pid');
expect(msg).to.have.property('signal').that.is.a('string').that.equals('signal');
expect(msg).to.have.property('arguments').that.is.an('object').that.has.property('arg', 22);
expect(msg).to.have.property('payload').that.is.an('array').that.contain('payload');
expect(msg).to.have.property('mid').that.is.a('string').that.equals('mid');
expect(msg).to.have.property('tenant').that.is.a('string').that.equals('tenant');
expect(msg).to.have.property('source').that.is.a('array').that.contain('source');
expect(msg).to.have.property('sid').that.is.a('string').that.equals('sid');
expect(msg).to.have.property('ok').that.is.a('boolean').that.is.true;
