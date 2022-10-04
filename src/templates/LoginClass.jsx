import React from "react";

const LoginClass = (props) => {
  console.log(props.users);
  return (
    <div>
      <h2>ログイン</h2>
      <button onClick={() => props.actions.signIn()}>ログインする</button>
    </div>
  );
};

export default LoginClass;
// import React, { Component } from "react";

// export default class LoginClass extends Component {
//   render() {
//     console.log(this.props.users);
//     return (
//       <div>
//         <h2>ログイン</h2>
//         <button onClick={() => this.props.actions.signIn()}>
//           ログインする
//         </button>
//       </div>
//     );
//   }
// }
