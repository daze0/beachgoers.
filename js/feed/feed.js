import { FeedRequest } from './feedRequest.js';

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const request = new FeedRequest(urlParams.get('post'));
    request.loadRequest();
}

init();