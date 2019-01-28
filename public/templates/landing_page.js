console.log('start script');
const introNode = document.querySelector('#introduction');
console.log('introNode ', introNode);

const intros = [
    "Hello, I'm Quyen",
    // "A Fullstack Web Developer",
]

const showText = (text, node, index) => {
    if (index < text.length) {
        node.textContent += text.charAt(index);
        index+=1;
        setTimeout(()=> showText(text, node, index), 100);
    }
};

const deleteText = (node, index)=>{
    if(index>=0){
        text = node.textContent;
        node.textContent=node.textContent.slice(0, index);
        index-=1;
        setTimeout(()=> deleteText(node, index), 50);
    }
}

intros.map((intro) => {
    showText(intro, introNode, 0);
    // deleteText(introNode, introNode.textContent.length);
})
