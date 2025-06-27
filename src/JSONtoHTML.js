// Input:
// const json = {
//   type: 'div',
//   props: { id: 'hello', class: "foo" },
//   children: [
//     {type:'h1', children: 'HELLO' },
//     {type:'p', children: [{type:'span', props: {class: "bar" }, children: 'World' }] }
//   ]
// };

// JSONtoHTML(json);

// Output:
// <div id="hello" class="foo">
//   <h1>HELLO</h1>
//   <p>
//      <span class="bar">World</span>
//   </p>
// </div>
//
// similar to how react converts JSX to elements this function can do the same thing

function getAttributes(props) {
  if (!props) {
    return "";
  } else {
    return (
      " " +
      Object.keys(props)
        .map((key) => `${key}="${props[key]}"`)
        .join(" ")
    );
  }
}

const newline = "\n";

function toHTML(json) {
  if (!json) {
    return "";
  }
  if (json.constructor === Array) {
    // handle array
    return json.map((ele) => toHTML(ele)).join(newline);
  } else if (json.type) {
    // handle nodes
    return (
      `<${json.type}${getAttributes(json.props)}` +
      newline +
      toHTML(json.children) +
      `</${json.type}>`
    );
  } else {
    // handle content
    return json;
  }
}

const json1 = {
  type: "div",
  props: { id: "hello", class: "foo" },
  children: [
    { type: "h1", children: "HELLO" },
    {
      type: "p",
      children: [{ type: "span", props: { class: "bar" }, children: "World" }],
    },
  ],
};

const json2 = {
    type: "div",
    props: { id: "hello", class: "foo" },
    children: [
      { type: "h1", children: "HELLO" },
      {
        type: "p",
        children: [{ type: "span", props: { class: "bar" }, children: "World" }],
      },
    ],
  };

console.log(toHTML(json));
