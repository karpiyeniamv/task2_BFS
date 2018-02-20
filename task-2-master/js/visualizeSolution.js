(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    var CELL_UNVISITED = 0;
    var CELL_WATER = 1;
    var CELL_ISLAND = 2;
    var CELL_CURRENT = 3;

    // lock используется для синхронизации визуализации (нажатие кнопки 'Play visualization')
    var lock = 0;


    /**
     * Бонусное задание.
     * Необходимо взять реализацию функции solution и доработать,
     * добавив функционал, который позволит пошагово визуализировать работу данного алгоритма.
     * Сигнатуру функции можно выбрать наиболее удобную для вашей визуализации
     */


    //function element скопирована из render.js
    function element(type, className, text) {
        var elem = document.createElement(type);
        elem.className = className;
        if (text) {
            elem.innerText = text;
        }
        return elem;
    }

    // функция для сохранения текущей раскраски ячеек
    function addCurrentCells(arrayCurrentCells, countArrayCurrentCells, N, M, cellsCheck) {
        for (var i = 0; i < N; i++) {
            for (var j = 0; j < M; j++) {
                arrayCurrentCells[countArrayCurrentCells][i][j] = cellsCheck[i][j];
            }
        }
        countArrayCurrentCells = countArrayCurrentCells + 1;
        return countArrayCurrentCells;
    }

    function visualizeSolution(map) {
        // todo: визуализировать работу алгоритма

        //CONTAINER ELEMENT
        containerElem = document.createElement('div');
        containerElem.className = 'map';

        // BUTTON PLAY
        var btnPlayElem = document.createElement('button');
        btnPlayElem.className = 'btn';
        btnPlayElem.innerText = 'Play visualization';
        btnPlayElem.addEventListener('click', function () {
            onBtnPlayClick(map);
        }, false);

        containerElem.appendChild(btnPlayElem);

        // BUTTON HISTORY
        var btnPrintHistory = document.createElement('button');
        btnPrintHistory.className = 'btn';
        btnPrintHistory.innerText = 'Print step by step';
        btnPrintHistory.addEventListener('click', function () {
            onBtnPrintHistory(map);
        }, false);

        containerElem.appendChild(btnPrintHistory);
        // containerElem.appendChild(element('br', ''));

        //DIV для BUTTON PLAY
        var onBtnPlayClickDiv = document.createElement('div');
        onBtnPlayClickDiv.className = 'onBtnPlay';
        containerElem.appendChild(onBtnPlayClickDiv);

        //DIV для BUTTON HISTORY
        var onBtnPrintHistoryDiv = document.createElement('div');
        onBtnPrintHistoryDiv.className = 'onBtnPrint';
        containerElem.appendChild(onBtnPrintHistoryDiv);

        countArrayCurrentCells = 0;


        function onBtnPlayClick(map) {
            if (lock == 0) {
                // containerElem.appendChild(element('br', ''));
                var timeout = 0;
                arrayCurrentCells = getVersionArray(map);
                testArrElem = new Array(countArrayCurrentCells);

                for (var k = 0; k < countArrayCurrentCells; k++) {
                    var tempDiv = document.createElement('div');
                    tempDiv.className = 'flagClassName';
                    tempDiv.appendChild(renderCells(arrayCurrentCells[k]));
                    testArrElem[k] = tempDiv;
                }


                for (var k = 0; k < countArrayCurrentCells; k++) {
                    ch = document.getElementsByClassName('flagClassName');
                    lock--;
                    setTimeout(
                        function (N) {
                            return function () {
                                lock++;
                                if (ch[0]) {
                                    document.querySelector('.onBtnPlay').replaceChild(testArrElem[N], ch[0]);
                                }

                                else {
                                    document.querySelector('.onBtnPlay').appendChild(testArrElem[N]);
                                }

                            }
                        }(k)
                        , timeout
                    );
                    timeout += 500;
                }
            }
        }


        function renderCells(tempTable) {
            var temp = document.createElement('div');
            temp.appendChild(element('div', 'map__res', ' Visualisation'));
            for (y = 0; y < tempTable.length; y++) {
                row = tempTable[y];
                rowElem = element('div', 'map__row');
                for (x = 0; x < row.length; x++) {
                    cell = row[x];
                    switch (cell) {
                        case CELL_UNVISITED:
                            type = 'unvisited';
                            break;

                        case CELL_WATER:
                            type = 'water';
                            break;

                        case CELL_ISLAND:
                            type = 'island';
                            break;

                        case CELL_CURRENT:
                            type = 'current';
                            break;

                        default:
                            type = undefined;
                    }
                    rowElem.appendChild(
                        element('div', 'map__cell' + (type ? ' map__cell_' + type : ''))
                    );
                }
                temp.appendChild(rowElem);
            }
            return temp;
        }

        function onBtnPrintHistory(map) {

            var onBtnPrintHistoryDivTemp = document.createElement('div');
            onBtnPrintHistoryDivTemp.className = 'flagPrintClassName';

            arrayCurrentCells = getVersionArray(map);

            renderCellsCheck(arrayCurrentCells);

            function renderCellsCheck(arrayCurrentCells) {
                var tempContainer = element('div', 'tempContainer');
                tempContainer.appendChild(element('div', 'map__res', ' Step by step'));

                for (k = 0; k < countArrayCurrentCells; k++) {
                    var newTempContainer = element('div', 'tempContainer');
                    cellsArr = arrayCurrentCells[k];
                    for (y = 0; y < cellsArr.length; y++) {
                        row = cellsArr[y];
                        rowElem = element('div', 'map__row');
                        //console.log( "row "+row);

                        for (x = 0; x < row.length; x++) {
                            cell = row[x];
                            //  console.log( "type "+cell);

                            switch (cell) {
                                case CELL_UNVISITED:
                                    type = 'unvisited';
                                    break;

                                case CELL_WATER:
                                    type = 'water';
                                    break;

                                case CELL_ISLAND:
                                    type = 'island';
                                    break;

                                case CELL_CURRENT:
                                    type = 'current';
                                    break;

                                default:
                                    type = undefined;
                            }

                            rowElem.appendChild(
                                element('div', 'map__cell' + (type ? ' map__cell_' + type : ''))
                            );
                        }

                        newTempContainer.appendChild(rowElem);
                        tempContainer.appendChild(newTempContainer);
                    }
                    onBtnPrintHistoryDivTemp.appendChild(tempContainer)
                }

            }

            cht = document.getElementsByClassName('flagPrintClassName');


            if (cht[0]) {
                document.querySelector('.onBtnPrint').replaceChild(onBtnPrintHistoryDivTemp, cht[0]);
            }

            else {
                document.querySelector('.onBtnPrint').appendChild(onBtnPrintHistoryDivTemp);
            }

            containerElem.appendChild(onBtnPrintHistoryDiv);

        }


        return containerElem;
    }

    function getVersionArray(map) {
        var tempMap = map;
        var N, M;
        N = tempMap.length;
        M = tempMap[0].length;

        arrayCurrentCells = new Array(N * M * 3);
        countArrayCurrentCells = 0;//свободная позиция

        //массив для хранения текущих состояний
        for (var k = 0; k < N * M * 3; k++) {
            arrayCurrentCells[k] = new Array(N);
            for (var i = 0; i < N; i++) {
                arrayCurrentCells[k][i] = new Array(M);
                for (var j = 0; j < M; j++) {
                    arrayCurrentCells[k][i][j] = -1;
                }
            }
        }

        cellsCheckOneStep = new Array(N);
        for (var i = 0; i < N; i++) {
            cellsCheckOneStep[i] = new Array(M);
        }
        for (var i = 0; i < N; i++) {
            for (var j = 0; j < M; j++)
                cellsCheckOneStep[i][j] = CELL_UNVISITED;
        }

        // первый пустой слой
        countArrayCurrentCells = addCurrentCells(arrayCurrentCells, countArrayCurrentCells, N, M, cellsCheckOneStep);




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
            var k,f;
            k= Math.floor(vertex[i]/M);
            f= vertex[i]%M;

            var temp = cellsCheckOneStep[k][f];
            cellsCheckOneStep[k][f] = CELL_CURRENT;
            countArrayCurrentCells = addCurrentCells(arrayCurrentCells, countArrayCurrentCells, N, M, cellsCheckOneStep);
            cellsCheckOneStep[k][f] = CELL_ISLAND;



            if (checkArray[i] == 0)
            {
                stack.push(i);
                checkArray[i]=1;
                for (var j=0; j<countVertex; j++){
                    if (adjacencyMatrix[i][j] == 1){ //если есть ребро
                        if (checkArray[j] == 0 ) // если вершина не просмотрена
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
                else
                {
                    cellsCheckOneStep[i][j] = CELL_WATER;
                    countArrayCurrentCells = addCurrentCells(arrayCurrentCells, countArrayCurrentCells, N, M, cellsCheckOneStep);
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
                var k= Math.floor(vertex[i]/M);
                var f= vertex[i]%M;
                if ( cellsCheckOneStep[k][f] == CELL_UNVISITED )
                {
                    BFS(i);
                }

            }
        }


        countArrayCurrentCells = addCurrentCells(arrayCurrentCells, countArrayCurrentCells, N, M, cellsCheckOneStep);
        return arrayCurrentCells;

    }

    root.SHRI_ISLANDS.visualizeSolution = visualizeSolution;
})(this);
