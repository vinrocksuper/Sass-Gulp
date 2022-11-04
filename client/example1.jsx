const HelloWorld = () => {
  return (
      <div>
          Hello Worlds!
      </div>
  );
};

const init = () => {
  ReactDOM.render(<HelloWorld />, document.getElementById('app'));
};

window.onload = init;