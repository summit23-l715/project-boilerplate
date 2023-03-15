import { createOptimizedPicture } from '../../scripts/lib-franklin.js'

export default async function decorate(block) {
    const { href } = block.firstElementChild.querySelector('a')
    const resp = await fetch(href)
    if (resp.ok) {
        const { data } = await resp.json()
        const teasers = data.map(({ path, image, description, title }) => {
            const picture = createOptimizedPicture(image, '', false, [{ width: 400 }])
            return `
                <a href="${path}" title="${title}" class="recent-article">
                    ${picture.outerHTML}
                    <h4>${title}</h4>
                    <p>${description}</p>
                </a>`
        });
        block.innerHTML = `<ul>${teasers.map(teaser => `<li>${teaser}</li>`).join('\n')}</ul>`
    } else {
        block.remove()
    }
}