var board, game = new Chess();


//Random Moves
var RNGesusMove = function(game) {
  var possibleMoves = game.ugly_moves();
  var RNG = Math.floor(Math.random() * possibleMoves.length);
  return newGameMoves[RNG];
};


//Minimax Algorithm implementation

//change depth as required
var minimaxDepth = 3;
//First node call
var iniMinimaxCall = function(height, MaxPlayerFlag, game) {

    var possibleMoves = game.ugly_moves();
    var bestMove = -9999;
    var bestMoveAvl;

    for(var i = 0; i < possibleMoves.length; i++) {
        var curMove = possibleMoves[i];
        game.ugly_move(curMove);
        var score = minimaxChess(-10000, 10000, height - 1, !MaxPlayerFlag, game);
        game.undo();
        if(score >= bestMove) {
            bestMove = score;
            bestMoveAvl = curMove;
        }
    }
    return bestMoveAvl;
};

//General node call with pruning
var minimaxChess = function(alpha, beta, height, MaxPlayerFlag, game) {

	if( height == 0)
	{
		return -findScore(game.board());
	}

	var possibleMoves = game.ugly_moves();
	if(MaxPlayerFlag)
	{
		//MAXIMIZE
		var bestMove = -9999;
		for( var i=0; i<possibleMoves.length; i++)
		{
			game.ugly_move(possibleMoves[i]);
			bestMove = Math.max(minimaxChess(alpha,beta,height-1,!MaxPlayerFlag,game));
			game.undo();
	        alpha = Math.max(alpha, bestMove)
	        if(beta <= alpha)
	      	   return bestMove;
	      
		}
		return bestMove;
	}
	else
	{	
		//MINIMIZE
		var bestMove = +9999;
		for( var i=0; i<possibleMoves.length; i++)
		{
			game.ugly_move(possibleMoves[i]);
			bestMove = Math.min(minimaxChess(alpha,beta,height-1,!MaxPlayerFlag,game));
			game.undo();
			beta = Math.min(beta, bestMove)
	        if(beta <= alpha)
	      	   return bestMove;
	      
		}
		return bestMove;	
	}



};

//Taking any available piece
var BestPieceCapMove = function(game) {
	var possibleMoves = game.ugly_moves();
	var bestAvlMove = null;
	var bestScore = -1;

	for(var i=0;i<possibleMoves.length;i++) {
		var curMove = possibleMoves[i];
		game.ugly_move(curMove);
		var curScore = - findScore(game.board());
		game.undo();
		if(curScore > bestScore) {
			bestScore = curScore;
			bestAvlMove = curMove;
		}
	}
	return bestAvlMove;
}


//Move Evaluation Function
/* Traditional Piece Values:-
Pawn - 1
Knight, Bishop - 3
Rooks -5
Queen - 9
*/


var findScore = function (board) {
    var totalScore = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            totalScore = totalScore + evaluatePiecePosition(board[i][j],i,j);
        }
    }
    return totalScore;
};

//Board evaluation for each piece based on location
var convWhiteToBlackArray = function(array) {
    return array.slice().reverse();
};


var whitePawnBoard =
    [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
    ];

var blackPawnBoard = convWhiteToBlackArray(whitePawnBoard);

var knightBoard =
    [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
    ];

var whiteBishopBoard = [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

var bishopEvalBlack = convWhiteToBlackArray(whiteBishopBoard);

var whiteRookBoard = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

var blackRookBoard = convWhiteToBlackArray(whiteRookBoard);

var queenBoard =
    [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var whiteKingBoard = [

    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

var blackKingBoard = convWhiteToBlackArray(whiteKingBoard);

var getPieceScore = function (piece, color, x ,y) 
    {
		   if(color === 'w')
		   {	
		        if (piece.type === 'p') {
		            return 1 + whitePawnBoard[y][x];
		        } 
		        else if (piece.type === 'r') {
		            return 5 + whiteRookBoard[y][x];
		        } 
		        else if (piece.type === 'n') {
		            return 3 + knightBoard[y][x];
		        } 
		        else if (piece.type === 'b') {
		            return 3 + whiteBishopBoard[y][x];
		        } 
		        else if (piece.type === 'q') {
		            return 9 + queenBoard[y][x];
		        } 
		        else if (piece.type === 'k') {
		            return 100 + whiteKingBoard[y][x];
		        }
		   }
		   else
		   	if(color === 'b')
		   {	
		        if (piece.type === 'p') {
		            return 1 + blackPawnBoard[y][x];
		        } 
		        else if (piece.type === 'r') {
		            return 5 + blackRookBoard[y][x];
		        } 
		        else if (piece.type === 'n') {
		            return 3 + knightBoard[y][x];
		        } 
		        else if (piece.type === 'b') {
		            return 3 + bishopEvalBlack[y][x];
		        } 
		        else if (piece.type === 'q') {
		            return 9 + queenBoard[y][x];
		        } 
		        else if (piece.type === 'k') {
		            return 100 + blackKingBoard[y][x];
		        }
		   }
       
    };




var evaluatePiecePosition = function (piece, x, y) {
    if (piece === null) {
        return 0;
    }
        var pieceVal = getPieceScore(piece, piece.color, x ,y);
    return piece.color === 'w' ? pieceVal : -pieceVal;
};


var makeBestMove = function() {
  var bestMove = getBestMove(game);
  game.ugly_move(bestMove);
  board.position(game.fen());
  printMoves(game.history());
  if (game.game_over()) {
  	if(game.in_draw() === true)
  		alert('Draw');
  	else
    alert('Checkmate');
  }
};

var getBestMove = function(game) {
  if (game.game_over()) {
    if(game.in_draw() === true)
  		alert('Draw');
  	else
    alert('Checkmate');
  }
  var bestMove = iniMinimaxCall(minimaxDepth,true,game);
  return bestMove;
};



/* Board effects*/
var onDragStart = function(source, piece, position, orientation) {
  if (game.in_checkmate() === true || game.in_draw() === true ||
    piece.search(/^b/) !== -1) {
    return false;
  }
};


var printMoves = function(moves) {
  var historyElement = $('#move-history').empty();
  historyElement.empty();
  for (var i = 0; i < moves.length; i = i + 2) {
    historyElement.append('<span>' + moves[i] + ' ' + (moves[i + 1] ? moves[i + 1] : ' ') + '</span><br>')
  }
  historyElement.scrollTop(historyElement[0].scrollHeight);

};

var onDrop = function(source, target) {

  var move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  removeGreySquares();
  if (move === null) {
    return 'snapback';
  }

  printMoves(game.history());
  window.setTimeout(makeBestMove, 250);
};

var onSnapEnd = function() {
  board.position(game.fen());
};

var onMouseoverSquare = function(square, piece) {
  var moves = game.moves({
    square: square,
    verbose: true
  });

  if (moves.length === 0) return;

  greySquare(square);

  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to);
  }
};

var onMouseoutSquare = function(square, piece) {
  removeGreySquares();
};

var removeGreySquares = function() {
  $('#board .square-55d63').css('background', '');
};

var greySquare = function(square) {
  var squareEl = $('#board .square-' + square);

  var background = '#a9a9a9';
  if (squareEl.hasClass('black-3c85d') === true) {
    background = '#696969';
  }

  squareEl.css('background', background);
};

var cfg = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  onSnapEnd: onSnapEnd
};
board = ChessBoard('board', cfg);
