class StudySession {
    constructor(expectedAnswers, mistakes) {
        this.expectedAnswers = expectedAnswers;
    }

    evaluateAnswer() {

    }
}

function startStudySession() {
    const input = document.querySelector('.registration__input');

    addEventListener('onkeydown', (e) => {
        if (e.key === 'Enter') {
            evaulateAnswer();
        }
    })
}

function evaulateAnswer(expected, actual) {

}
