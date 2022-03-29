export default class MatrixRotator {

    constructor(mat) {
        this.mat = mat;
    }
    // Recursive solution
    rotateRec(matrix, start) {
        let n = matrix.length - 1;
        if (start === n) return;
        let i = start;
        for (let j = i; j < n - i; j++) {
            let t = matrix[i][j];
            matrix[i][j] = matrix[n - j][i];
            matrix[n - j][i] = matrix[n - i][n - j];
            matrix[n - i][n - j] = matrix[j][n - i];
            matrix[j][n - i] = t;
        }
        this.rotateRec(matrix, start + 1);
    }

    getRotatedMatrixRec(){
        this.rotateRec(this.mat, 0)
        return this.mat
    }
}