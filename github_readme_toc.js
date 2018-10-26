// ==UserScript==
// @name         github-readme-toc
// @namespace    https://github.com/turnon/github_readme_toc
// @version      0.0.1
// @description  add table of content for readme in github repo
// @author       block24block@gmail.com
// @match        https://github.com/*/*
// @grant        none
// ==/UserScript==
(function () {
    if (window.location.pathname.match(/\w\/\w/g).length > 1) return

    let style = document.createElement('style'),
        css = '\
#github-readme-toc {\
    position: fixed;\
    top: 200px;\
    left: calc((100% - 978px) / 2 + 1000px);\
    list-style-type: none;\
}\
#github-readme-toc a {\
    overflow: hidden;\
    white-space: nowrap;\
    width: calc((100% -100 px) / 2);\
    text-overflow: ellipsis;\
    display: block;\
}'

    style.type = 'text/css'
    style.appendChild(document.createTextNode(css))
    document.head.insertAdjacentElement('beforeend', style)

    let fragments = ['<ul id="github-readme-toc">'],
        space = "&nbsp;",
        item_begin = '<li><a href="#',
        item_end = '</a></li>'

    document.querySelector('#readme .Box-body').querySelectorAll('h2, h3, h4, h5, h6').forEach(h => {
        fragments.push(item_begin)
        fragments.push(h.querySelector('a').id)
        fragments.push('">')
        fragments.push(space.repeat(parseInt(h.nodeName.replace('H', '') - 2) * 2))
        fragments.push(h.innerText)
        fragments.push(item_end)
    })

    fragments.push('</ul>')

    document.body.insertAdjacentHTML('afterbegin', fragments.join(''))
})()