import { useEffect } from 'react'
import throttle from 'lodash/throttle'
import placeholder from '../placeholder.png';
import imgs from '../imgs';

function LazyLoadV2() {
  const loadImage = (el) => {
    const src = el.getAttribute('data-src')
    el.setAttribute('src', src);
    el.removeAttribute("data-src");
  }

  const handleScroll = (e) => {
    const nodes = document.querySelectorAll('img[data-src]')
    // 视口高度
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect()
      if(rect.top < viewHeight && rect.bottom >= 0) {
        loadImage(node)
      }
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', throttle(handleScroll, 100))
    handleScroll()
    return () => window.removeEventListener('scroll', throttle(handleScroll, 100))
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

export default LazyLoadV2;
