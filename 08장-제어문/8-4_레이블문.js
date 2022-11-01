outerLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const sum = i + j;

    if (sum > 3) {
      break outerLoop;
    }

    console.log("[i, j, sum]: ", [i, j, sum]);
  }
}