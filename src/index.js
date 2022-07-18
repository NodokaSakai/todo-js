import "./styles.css";

// 追加ボタンが押された時に動く関数(テキストボックスの値の取得＆初期化)
const onClickAdd = () => {
  // add-textというid名のテキストボックス内の文字をinputTextという変数に格納
  const inputText = document.getElementById("add-text").value;
  // テキストボックスを空に
  document.getElementById("add-text").value = "";

  //未完了リストに要素を追加する関数の呼び出し
  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除する関数
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// 未完了リストに要素を追加する関数
const createIncompleteList = (text) => {
  // 取得した値を用いて新たなリスト作成(div生成)
  // divタグをdivという変数に格納
  const div = document.createElement("div");
  // console.log(div); // <div></div>
  // 生成したdivタグに"list-row"というclass名を付与
  div.className = "list-row";
  // console.log(div); // <div class="list-row"></div>

  // liタグ生成
  const li = document.createElement("li");
  // console.log(li); //<li></li>
  // liの中身にinputTextを入れる
  li.innerText = text;
  // console.log(li); //<li>アイウエオ</li>

  // button(完了)作成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  // 完了ボタンに対してイベントを設定
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親タグ(div)を未完了リストから削除
    // divタグの取得(parentNode:親タグの取得)
    deleteFromIncompleteList(completeButton.parentNode);

    // 完了リストに追加する要素
    const addTarget = completeButton.parentNode; // divタグ

    // ToDo内容テキストを取得
    const text = addTarget.firstElementChild.innerText; // liタグの中身

    // div以下を初期化
    addTarget.textContent = null;

    // liタグの生成
    const li = document.createElement("li");
    li.innerText = text;

    // 戻すbuttonタグ生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの親タグ(div)を完了リストから削除
      const deleteTarget = backButton.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      // テキスト取得
      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });

    // divタグの子要素に各要素に設定(appendchild)
    addTarget.appendChild(li);
    addTarget.appendChild(backButton);

    // 完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });
  // console.log(completeButton); // <button>完了</button>

  // button(削除)作成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  // 削除ボタンに対してイベントを設定
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ(div)を未完了リストから削除
    // // divタグの取得(parentNode:親タグの取得)
    // const deleteTarget = deleteButton.parentNode;
    // // "incomplete-list"から指定のdivタグを削除(removeChild:特定の子要素の削除)
    // document.getElementById("incomplete-list").removeChild(deleteTarget);

    deleteFromIncompleteList(deleteButton.parentNode);
  });
  // console.log(deleteButton); // <button>削除</button>

  // divタグの子要素に各要素を設定(divタグの中にliタグを入れる)
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  // console.log(div); // <div><li></li></div>

  // divタグとliタグのセットを未完了リストに追加
  document.getElementById("incomplete-list").appendChild(div);
};

// add-button というid名を持ったボタンに対してonClickAdd()を適用
document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
