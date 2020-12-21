import { useEffect } from 'react'
import placeholder from '../placeholder.png';
import imgs from '../imgs';

const options = {
  threshold: 0.5
}

function LazyLoadV3() {
  const loadImage = (el) => {
    const src = el.getAttribute('data-src')
    el.setAttribute('src', src);
    el.removeAttribute("data-src");
  }

  const callback = (items, observer) => {
    items.forEach(item => {
      if(item.isIntersecting) {
        loadImage(item.target)
        observer.unobserve(item.target)
      }
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options)
    const nodes = document.querySelectorAll('img[data-src]')
    nodes.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {imgs.map(img => (
        <img
          key={img} 
          src={placeholder}
          data-src={img}
          alt="" 
        />
      ))}
    </>
  );
}

export default LazyLoadV3;
