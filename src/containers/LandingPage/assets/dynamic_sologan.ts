const showText = (text:string, node:HTMLElement, index:number) => {
  if (index < text.length) {
    node.textContent += text.charAt(index);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(showText(text, node, ++index)), 60)
    });
  } else{
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(deleteText(node, index)), 1000);
    })
  };
}

const deleteText = (node: HTMLElement, index:number) => {
  if (index >= 0) {
    node.textContent = node.textContent.slice(0, index);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(deleteText(node, --index)), 20);
    })
  } else{
    return new Promise((resolve, reject)=> setTimeout(()=>resolve('next'), 1000));
  }
}

export const generateDynamicSologan = (sologan: any, textNode: HTMLElement) => {
  let i=0;
  setTimeout(async ()=> {
    while(true){
      await showText(sologan[i], textNode, 0);
      i === sologan.length-1 ? i=0: i++;
    }
  }, 1000);
};
