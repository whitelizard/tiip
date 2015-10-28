describe('tiip', function(){
    beforeEach(module('tiip'));
       
    it('all arguments', inject(function(tiip) { //parameter name = service name
        expect( tiip.unpack(tiip.pack('type', 'pid', 'signal', ['payload'], 'mid', 'tenant', 'source', true)) )
        .toEqual(jasmine.objectContaining({
            signal: 'signal',
            payload: ['payload'],
            type: 'type',
            pid: 'pid',
            ok: true,
            source: 'source',
            mid: 'mid',
            tenant: 'tenant'
        }));
    }));

})
