import { useEffect } from 'react'
import throttle from 'lodash/throttle'
import placeholder from '../placeholder.png';
import imgs from '../imgs';

function LazyLoadV1() {
  const loadImage = (el) => {
    const src = el.getAttribute('data-src')
    el.setAttribute('src', src);
    el.removeAttribute("data-src");
  }

  const getTop = (el) => {
    let top = 0;
    while (el) {
      top += el.offsetTop;
      el = el.offsetParent;
    }
    return top;
  }

  const handleScroll = (e) => {
    const nodes = document.querySelectorAll('img[data-src]');
    // 页面已滚动高度
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 视口高度
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    nodes.forEach(node => {
      if(getTop(node) < scrollTop + viewHeight) {
        loadImage(node)
      }
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', throttle(handleScroll, 100));
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

export default LazyLoadV1;
