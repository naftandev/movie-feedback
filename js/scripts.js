/*-- START: Variables */
const $body = document.getElementById('body')
const $imageMovie = document.getElementById('imageMovie')
const $modalImageBG = document.getElementById('modalImageBG')
const $closeMovieModal = document.getElementById('closeMovieModal')
const $score = document.getElementById('score')
const $feedback = document.getElementById('feedback')
const $like = $feedback.querySelector('.fa-heart')
const $comment = $feedback.querySelector('.fa-comments')
const $modalCommentBG = document.getElementById('modalCommentBG')
const $modalComment = document.getElementById('modalComment')
const $share = $feedback.querySelector('.fa-share')
const $modalShareBG = document.getElementById('modalShareBG')
const $modalShare = document.getElementById('modalShare')
const $closeCommentModal = document.getElementById('closeCommentModal')
const $closeShareModal = document.getElementById('closeShareModal')
const $tooltip = document.getElementById('tooltip')
/*-- END: Variables */


/*-- START: Full Image Movie Modal */
function removeFadeOut() {
  $modalImageBG.classList.remove('fadeOut')
  $modalImageBG.removeEventListener('animationend', removeFadeOut)
}

function fadeOut() {
  $modalImageBG.classList.add('fadeOut')
  $modalImageBG.addEventListener('animationend', removeFadeOut)
}

function removeFadeIn() {
  $modalImageBG.classList.remove('fadeIn')
  $modalImageBG.removeEventListener('animationend', removeFadeIn)
}

function fadeIn() {
  $modalImageBG.classList.add('fadeIn')
  $modalImageBG.addEventListener('animationend', removeFadeIn)
}

function hideMovieModal() {
  $modalImageBG.classList.add('hide')
  $modalImageBG.classList.remove('modal-bg--movie')
  $modalImageBG.removeEventListener('animationend', hideMovieModal)
}

function closeImageModal(event) {
  if (event.target == $modalImageBG  || event.target == $closeMovieModal) {
    $body.classList.remove('overflow-hidden')
    fadeOut()
    $modalImageBG.addEventListener('animationend', hideMovieModal)
    $modalImageBG.removeEventListener('click', closeImageModal)
    $closeMovieModal.removeEventListener('click', closeImageModal)
  }
}

$imageMovie.addEventListener('click', () => {
  $body.classList.add('overflow-hidden')
  $modalImageBG.classList.remove('hide')
  $modalImageBG.classList.add('modal-bg--movie')
  fadeIn()
  $modalImageBG.addEventListener('click', closeImageModal)
  $closeMovieModal.addEventListener('click', closeImageModal)
})
/*-- END: Full Image Movie Modal */


/*-- START: Movie Score */
const score_stars = $score.querySelectorAll('i')
function addScore(score) {
  let scored_stars = []
  for (i = 1; i <= score; i++) {
    scored_stars.push($score.querySelector(`i[data-score='${i}']`))
  }
  scored_stars.forEach(scored_star => {
    scored_star.classList.add('scored')
  })
  window.localStorage.setItem('score',`${score}`)
}

(() => {
  if(window.localStorage.getItem('score')) {
    addScore(window.localStorage.getItem('score'))
  }
})()

score_stars.forEach(score_star => {
  score_star.addEventListener('click', event => {
    score_stars.forEach(score_star => score_star.classList.remove('scored'))
    score_star.classList.add('scorePress')
    score_star.addEventListener('animationend', event => {
      if (event.animationName === 'scorePress') {
        score_star.classList.remove('scorePress')
      }
    })
    addScore(event.target.dataset.score)
  })
})
/*-- END: Movie Score */


/*-- START: Feedback */
// Info (Tooltip)
$body.addEventListener('mouseover', event => {
  if (event.target === $like) {
    const likesTotal = Number(window.localStorage.getItem('likeTemp')) + 1157
    $tooltip.style.top = `calc(${$like.offsetTop}px - 55px)`;
    $tooltip.style.left = `calc(${$like.offsetLeft}px - 8px)`;
    $tooltip.querySelector('span').textContent = `${likesTotal} Likes`
    $tooltip.classList.remove('hide')
    $tooltip.classList.add('tooltipShow')
  } else if (event.target === $comment) {
    $tooltip.style.top = `calc(${$comment.offsetTop}px - 55px)`;
    $tooltip.style.left = `calc(${$comment.offsetLeft}px - 8px)`;
    $tooltip.querySelector('span').textContent = '267 Comentarios'
    $tooltip.classList.remove('hide')
    $tooltip.classList.add('tooltipShow')
  } else if (event.target === $share) {
    $tooltip.style.top = `calc(${$share.offsetTop}px - 55px)`;
    $tooltip.style.left = `calc(${$share.offsetLeft}px - 8px)`;
    $tooltip.querySelector('span').textContent = 'Compartido 27 veces'
    $tooltip.classList.remove('hide')
    $tooltip.classList.add('tooltipShow')
  } else {
    if (!$tooltip.classList.contains('hide')) {
      $tooltip.classList.add('tooltipHide')
    }
  }
})
$tooltip.addEventListener('animationend', event => {
  if (event.animationName === 'tooltipShow') {
    $tooltip.classList.remove('tooltipShow')
  } else if (event.animationName === 'tooltipHide') {
    $tooltip.classList.add('hide')
    $tooltip.classList.remove('tooltipHide')
  }
})

// LIKE
function addLike(feedback) {
  if (feedback === 'like') {
    $like.classList.toggle('liked')
    if($like.classList.contains('liked')) {
      window.localStorage.setItem('liked', 'like')
      window.localStorage.setItem('likeTemp', '1')
    } else {
      window.localStorage.removeItem('liked')
      window.localStorage.setItem('likeTemp', '0')
    }
  }
}

(() => {
  if(window.localStorage.getItem('liked')) {
    addLike(window.localStorage.getItem('liked'))
  }
})()

$like.addEventListener('click', event => {
  $like.classList.add('likePress')
  $like.addEventListener('animationend', event => {
    if (event.animationName === 'likePress') {
      $like.classList.remove('likePress')
    }
  })
  addLike(event.target.dataset.feedback)
})

// COMMENT
function closeModal(event) {
  if (event.target === $modalCommentBG || event.target === $closeCommentModal) {
    if (!$modalCommentBG.classList.contains('hide')) {
      $modalComment.classList.add('popOut')
      $modalCommentBG.removeEventListener('click', closeModal)
      $closeCommentModal.removeEventListener('click', closeModal)
    }
  } else if (event.target === $modalShareBG || event.target === $closeShareModal) {
    if (!$modalShareBG.classList.contains('hide')) {
      $modalShare.classList.add('hideToTop')
      $modalShareBG.removeEventListener('click', closeModal)
      $closeShareModal.removeEventListener('click', closeModal)
    }
  }
}

$comment.addEventListener('click', () => {
  $comment.classList.add('commentPress')
  $comment.addEventListener('animationstart', event => {
    if (event.animationName === 'commentPress') {
      $modalComment.classList.add('popIn')
      $modalCommentBG.classList.remove('hide')
      $modalCommentBG.addEventListener('click', closeModal)
      $closeCommentModal.addEventListener('click', closeModal)
    }
  })
})
$comment.addEventListener('animationend', event => {
  if (event.animationName === 'commentPress') {
    $comment.classList.remove('commentPress')
  }
})
$modalComment.addEventListener('animationend', event => {
  if (event.animationName === 'popIn') {
    $modalComment.classList.remove('popIn')
  } else if (event.animationName === 'popOut') {
    $modalComment.classList.remove('popOut')
    $modalCommentBG.classList.add('hide')
  }
})

// SHARE
$share.addEventListener('click', () => {
  $share.classList.add('sharePress')
  $share.addEventListener('animationstart', event => {
    if (event.animationName === 'sharePress') {
      $modalShareBG.classList.remove('hide')
      $modalShare.classList.add('showToBottom')
      $modalShareBG.addEventListener('click', closeModal)
      $closeShareModal.addEventListener('click', closeModal)
    }
  })
})
$share.addEventListener('animationend', event => {
  if (event.animationName === 'sharePress') {
    $share.classList.remove('sharePress')
  }
})
$modalShare.addEventListener('animationend', event => {
  if (event.animationName === 'showToBottom') {
    $modalShare.classList.remove('showToBottom')
  } else if (event.animationName === 'hideToTop') {
    $modalShare.classList.remove('hideToTop')
    $modalShareBG.classList.add('hide')
  }
})
/*-- END: Feedback */
