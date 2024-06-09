document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.querySelector('.page3_content_container');

    function createProjectDetail(project,idx) {

        
        const detailDiv = document.createElement('div');
        detailDiv.classList.add('project_container_detail');

        if (project.github) {
            detailDiv.style.cursor = 'pointer';
            detailDiv.addEventListener('click', () => {
                window.open(project.github, '_blank');
            });
        }

        const githubDiv = document.createElement('div');
        githubDiv.classList.add('project_container_detail_github');
        const githubSpan = document.createElement('span');
        githubSpan.classList.add('project_container_detail_github_span');
        githubSpan.innerText = 'Go github';
        githubDiv.appendChild(githubSpan);
        detailDiv.appendChild(githubDiv);
        
        const columnLeftDiv = document.createElement('img');
        columnLeftDiv.classList.add('project_container_detail_columnLeft');
        columnLeftDiv.src = project.imgsrc;
        detailDiv.appendChild(columnLeftDiv);

        const columnRightDiv = document.createElement('div');
        columnRightDiv.classList.add('project_container_detail_columnRight');
        detailDiv.appendChild(columnRightDiv);

        const projectTitleDiv = document.createElement('div');
        projectTitleDiv.classList.add('project_container_detail_columnRight_title');
        projectTitleDiv.textContent = project.name;
        columnRightDiv.appendChild(projectTitleDiv);

        const projectTitleLink = document.createElement('div');
        projectTitleLink.classList.add('project_container_detail_columnRight_link');
        const projectTitleLink_a = document.createElement('a');
        projectTitleLink_a.href = project.github;

        

        const periodDiv = document.createElement('div');
        periodDiv.classList.add('project_container_detail_columnRight_period');
        periodDiv.textContent = project.period;
        columnRightDiv.appendChild(periodDiv);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('project_container_detail_columnRight_content');
        project.tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.textContent = task;
            contentDiv.appendChild(taskDiv);
        });
        columnRightDiv.appendChild(contentDiv);

        const stackDiv = document.createElement('div');
        stackDiv.classList.add('project_container_detail_columnRight_stack');
        project.techStacks.forEach(stack => {
            const stackItemDiv = document.createElement('div');
            stackItemDiv.classList.add('stack');
            const stackSpan = document.createElement('span');
            stackSpan.textContent = stack;
            if(stack == 'vanilla JS'){
                stackItemDiv.classList.add('vanilla_JS');
            }
            else{
                stackItemDiv.classList.add(stack);
            }

            
            stackItemDiv.appendChild(stackSpan);
            stackDiv.appendChild(stackItemDiv);
        });
        columnRightDiv.appendChild(stackDiv);

        return detailDiv;
    }

    const project = [
        {   
            name: '네이버 부스트캠프 포트폴리오 사이트 제작',
            period: '2024.06.06 ~ 2024.06.10',
            tasks: ['거친 바다와 같은 세상을 네이버 부스트캠프와 함께 나아가는 간절한 소망이 담긴 웹사이트',],
            techStacks: ['vanilla JS',],
            github : 'https://github.com/dongguJeong/naverBootCamp',
            imgsrc : './img/포트폴리오.png',
        },
        {
        name: '카트라이더 모델 제작',
        period: '2024.05.26 ~ 2024.06.04',
        tasks: ['webgl을 사용한 계층 모델 구현'],
        techStacks: ['webgl',],
        github : 'https://github.com/JoKaeChat/computer-graphics',
        imgsrc : './img/webgl.png',
        },
        
        {
        name: 'SongSSam (파란학기)',
        period: '2023.06.02 ~ 2023.10.10',
        tasks: ['AI 커버곡 생성 사이트',],
        techStacks: ['TypeScript','React',],
        github : 'https://github.com/dongguJeong/SongSSam',
        imgsrc : './img/songssam.png',
        },
        {
            name: '멋쟁이사자 해커톤',
            period: '2023.06.02 ~ 2023.10.10',
            tasks: ['네이버 뉴스에 많이 나온 키워드를 수집해 관련된 요약 기사를 보여주는 사이트',],
            techStacks: ['TypeScript','NextJS'],
            github : 'https://github.com/dongguJeong/SongSSam',
            imgsrc : './img/keyword.png',  
        },
      
    ];

    project.forEach((item,idx) => {
        const projectDetailComponent = createProjectDetail(item,idx);
        const projectContainer = contentContainer.querySelector('.page3_project_container');
        projectContainer.appendChild(projectDetailComponent);
    });


});
