export function templateEngine(block) {
    if (block === undefined || block === null || block === false) {
        return document.createTextNode('');
    }

    if (typeof block === 'string' || typeof block === 'number' || block === true) {
        return document.createTextNode(block);
    }

    if (Array.isArray(block)) {
        const fragment = document.createDocumentFragment();
        block.forEach((item) => {
            const elem = templateEngine(item);
            fragment.appendChild(elem);
        });

        return fragment;
    }

    const tag = document.createElement(block.tag);

    if (block.cls) {
        tag.classList.add(...[].concat(block.cls).filter(Boolean));
    }

    if (block.attrs) {
        const keys = Object.keys(block.attrs);

        keys.forEach((key) => {
            tag.setAttribute(key, block.attrs[key]);
        });
    }

    const content = templateEngine(block.content);

    tag.appendChild(content);

    return tag;
}
