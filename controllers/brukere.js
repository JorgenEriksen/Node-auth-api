module.exports = {
    registrer: async (req, res, next) =>{
        console.log("BrukereController.registrer() er kjørt");
    },

    loginn: async (req, res, next) =>{
        console.log("!BrukereController.loginn() er kjørt");
    },

    hemmelig: async (req, res, next) =>{
        console.log("BrukereController.hemmelig() er kjørt");
    }
}