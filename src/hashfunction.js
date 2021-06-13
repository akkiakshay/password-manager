const { generator } = require("./generate-password");
const SHA256 = require("crypto-js/sha256");

const hash_func = (...args) => {
  const t = args.map((arg) => {
    const utf8 = unescape(encodeURIComponent(arg));
    let arr = [];
    for (let i = 0; i < utf8.length; i++) {
      arr.push(utf8.charCodeAt(i));
    }
    return arr.join("");
  });
  const joined = t.join("");

  return SHA256(joined).toString();
};

const expand = (buf, cnt, space_cost) => {
  for (let s = 1; s < space_cost; s++) {
    buf.push(hash_func(cnt, buf[s - 1]));
    cnt += 1;
  }

  return cnt;
};

const mix = (buf, cnt, delta, salt, space_cost, time_cost) => {
  for (let t = 0; t < time_cost; t++) {
    for (let s = 0; s < space_cost; s++) {
      buf[s] = hash_func(cnt, buf[s - 1], buf[s]);
      cnt += 1;
      for (let i = 0; i < delta; i++) {
        other = parseInt(hash_func(cnt, salt, t, s, i), 16) % space_cost;
        cnt += 1;
        buf[s] = hash_func(cnt, buf[s], buf[other]);
        cnt += 1;
      }
    }
  }
};

const extract = (buffer, options) => {
  let arr = [];
  let a = 0;

  for (let i = 0; i < buffer.length; i++) {
    a = 0;
    for (let j = 0; j < buffer.length; j++) {
      a += buffer[i][j].charCodeAt(0);
    }

    arr.push(a);
  }

  return generator(arr, options);
};

const balloon = (password, salt, space_cost, time_cost, delta) => {
  const buffer = [hash_func(0, password, salt)];

  let cnt = 1;

  cnt = expand(buffer, cnt, space_cost);

  mix(buffer, cnt, delta, salt, space_cost, time_cost);

  return buffer;
};

const balloon_hash = (password, salt, length, options) => {
  const delta = 5,
    time_cost = 20;
  const hashBuffer = balloon(password, salt, length, time_cost, delta);
  const newPassword = extract(hashBuffer, options);
  return newPassword;
};

module.exports = {
  balloon_hash,
};
