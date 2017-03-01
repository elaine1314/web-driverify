import Endpoint from '.';
import Debug from 'debug';

let debug = Debug('wd:endpoints:Forward');

class Foward extends Endpoint {
    static express(router) {
        router.post('/session/:sid/forward', (req, res, next) => {
            req.endpoint = new Foward();
            req.session.storage.confirm = {
                cmd: req.endpoint.dto(),
                data: 'forward complete'
            };
            next();
        });
    }
    transform(data, session) {
        debug('client loaded, clearing session.confirm...');
        session.storage.confirm = null;
        return data;
    }
}

export default Endpoint.register(Foward);
