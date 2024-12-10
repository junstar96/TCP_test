export const ConstMapping = () =>{
    console.log("hello world");
}

export const AthorMapping = () => {
    console.log("ahto");
}

const hello = {
    11 : ConstMapping,
    12 : AthorMapping
}

hello[11]();