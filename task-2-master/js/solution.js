(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */

    var vertex = new Array();
    var countVertex = 0;
    var checkArray;
    var countOfIslands = 0;
    var stack;
    var adjacencyMatrix;

    // поиск индекса по значению в vertex
    function searchInd (posV) {
        for (var i=0; i<countVertex;i++){
            if (vertex[i]==posV)
            {
                return i;
            }
        }
    }

    // функция проверки (рассмотрели ли все вершины графа)
    function allDeletedInCheckArray () {

        for (var i=0; i<countVertex; i++){
            if (checkArray[i]!=2){
                return false;
            }
        }
        return true;
    }

    // функция поиска в ширину
    function BFS (i){

        if (checkArray[i] == 0)
        {
            stack.push(i);
            checkArray[i]=1;
            for (var j=0; j<countVertex; j++){
                if (adjacencyMatrix[i][j] == 1){ //если есть ребро
                    if (checkArray[j] == 0) // если вершина не просмотрена
                    {
                        BFS(j);
                        // console.log (stack.length);
                    }
                }
            }
            checkArray[i]=2;
            stack.pop ();
            if (stack.length==0){
                countOfIslands++;
            }
        }
    }

    function solution(map) {
        // todo: подсчитать кол-во островов на карте

        var tempMap = map;
        var N, M;
        N=tempMap.length;
        M=tempMap[0].length;

        // vertex - массив вершин графа (ячейки с 1)
        for (var i=0;i<N; i++)
        {
            for (var j=0;j<M;j++)
            {
                if (tempMap[i][j]==1)
                {
                    vertex[countVertex]=i*M+j;
                    countVertex++;
                }
            }
        }

        // матрица смежности
        adjacencyMatrix = new Array(countVertex);
        for (var i=0;i<countVertex; i++)
        {
            adjacencyMatrix[i] =  new Array(countVertex);
            for (var j=0;j<countVertex;j++)
            {
                adjacencyMatrix[i][j]=0;
            }
        }

        // заполнение vertex и adjacencyMatrix
        for (var i=0;i<N-1; i++)
        {
            for (var j=0;j<M-1;j++)
            {
                if (tempMap[i][j]==1)
                {
                    var posV = i*M+j;
                    var indV= searchInd (posV);

                    if (tempMap[i+1][j]==1)
                    {
                        var posA=(i+1)*M+j;
                        var indA = searchInd (posA);
                        adjacencyMatrix[indV][indA]=1;
                        adjacencyMatrix[indA][indV]=1;
                    }

                    if (tempMap[i][j+1]==1 )
                    {
                        var posA=i*M+j+1;
                        var indA = searchInd (posA);
                        adjacencyMatrix[indV][indA]=1;
                        adjacencyMatrix[indA][indV]=1;
                    }
                }
            }
        }

        for (var i=0; i<N-1;i++)
        {
            var j=M-1;

            if (tempMap[i][j]==1)
            {
                var posV = i*M+j;
                var indV= searchInd (posV);

                if (tempMap[i+1][j]==1)
                {
                    var posA=(i+1)*M+j;
                    var indA = searchInd (posA);
                    adjacencyMatrix[indV][indA]=1;
                    adjacencyMatrix[indA][indV]=1;
                }
            }
        }

        for (var j=0;j< M-1;j++)
        {
            var i=N-1;
            if (tempMap[i][j]==1)
            {
                var posV = i*M+j;
                var indV= searchInd (posV);

                if (tempMap[i][j+1]==1 )
                {
                    var posA=i*M+j+1;
                    var indA = searchInd (posA);
                    adjacencyMatrix[indV][indA]=1;
                    adjacencyMatrix[indA][indV]=1;
                }
            }
        }
        checkArray = new Array();
        for (var i=0; i<countVertex;i++){
            checkArray[i] = 0;
        }

        stack = new Array();

        while (!allDeletedInCheckArray()){

            for (var i=0; i<countVertex;i++)// обход всех вершин (с меткой 1)
            {
                BFS(i);
            }
        }
        return countOfIslands;
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);
