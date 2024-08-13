<template>

<!-- TEMPLATE LAIN  -->
<div class="play-bar">
    <div class="play-bar-left">
      <div class="audio__player-play-and-title">
      <div class="audio__player-play-cont">
        <div class="audio__player-play" @click="togglePlayer">
          <img
  :src="option_ && option_.coverImage ? option_.coverImage : CoverImageDefault"
  :class="`${isPlaying && option_ && option_.coverRotate ? 'audio__player-spin-anim' : ''}`"
/>
          <div class="audio__player-play-icon">
            <img :src="isPlaying ? IconPause : IconPlay" />
          </div>
        </div>
      </div>
    </div>
    <div class="album-art-container">
    
    </div>
    <div class=" flex song-info">
      <slot name="title">
        <div v-if="option_.title" class="song-title">
          {{ option_.title }}
        </div>
      </slot>
      <slot name="artist">
        <div v-if="option_.title" class="song-artist">
          {{ option_.title }}
        </div>
      </slot>
    </div>
  </div>

  <div class="play-bar-center">
    
    <div class="audio__player-progress-container">
    <div class="flex justify-center">
    <Button 
    icon="pi pi-stop" 
    text
    rounded 
    raised 
    @click="stopTrack" 
    aria-label="Stop" 
    class="mr-4"
  />
    <Button 
    icon="pi pi-backward" 
    rounded 
    text
    raised 
    aria-label="Prev" 
    class="mr-2"
  />

    <Button 
    :icon="isPlaying ? 'pi pi-pause' : 'pi pi-play'" 
    rounded 
    text
    raised 
    @click="togglePlayer" 
    :aria-label="isPlaying ? 'Pause' : 'Play'" 
    class="mr-2"
  />
  <Button 
    icon="pi pi-forward" 
    rounded
    text
    raised 
    aria-label="Next" 
  />
  <!-- @click="nextTrack"  -->

    </div>   
      <div
        ref="audioProgressWrap"
        class="audio__player-progress-wrap"
        @click.stop="handleClickProgressWrap"
      >
        <div
          ref="audioProgress"
          class="audio__player-progress"
          :style="{
            backgroundColor: option_.progressBarColor,
          }"
        />
        <div
          ref="audioProgressPoint"
          class="audio__player-progress-point"
          :style="{
            backgroundColor: option_.indicatorColor,
            boxShadow: `0 0 10px 0 ${option_.indicatorColor}`,
          }"
          @panstart="handleProgressPanStart"
          @panend="handleProgressPanEnd"
          @panmove="handleProgressPanMove"
        />
      </div>
      <div class="audio__player-time">
        <span style="color : var(--p-text-color);">{{ `${formatSecond(currentTime)} / ${totalTimeStr}` }}</span>
      </div>
    
    </div>
    <div class="progress-bar-container">
      
    </div>
  </div>
  <!-- <div class="play-bar-right"> -->
    <!-- Volume control -->
    <!-- <button @click="toggleMute" :aria-label="isMuted ? 'Unmute' : 'Mute'">
      <i :class="isMuted ? 'pi pi-volume-off' : 'pi pi-volume-up'"></i>
    </button> -->

    <!-- Shuffle control -->
    <!-- <button @click="toggleShuffle" :aria-label="isShuffle ? 'Disable Shuffle' : 'Enable Shuffle'">
      <i :class="isShuffle ? 'pi pi-random' : 'pi pi-sort-amount-down-alt'"></i>
    </button> -->

    <!-- Repeat control -->
    <!-- <button @click="toggleRepeat" :aria-label="isRepeat ? 'Disable Repeat' : 'Enable Repeat'">
      <i :class="isRepeat ? 'pi pi-refresh' : 'pi pi-replay'"></i>
    </button> -->
  <!-- </div> -->

  </div>


  <div class="audio__player">
    <div class="audio__player-play-and-title">
      <div class="audio__player-play-cont">
        <div class="audio__player-play" @click="togglePlayer">
          <img
            :src="option_.coverImage ? option_.coverImage : CoverImageDefault"
            :class="`${
              isPlaying && option_.coverRotate ? 'audio__player-spin-anim' : ''
            }`"
          />
          <div class="audio__player-play-icon">
            <img :src="isPlaying ? IconPause : IconPlay" />
          </div>
        </div>
      </div>
    </div>
   
    <audio
      ref="audioPlayer"
      :src="option_.src"
      @ended="onAudioEnded"
      @play="onAudioPlay"
      @pause="onAudioPause"
      @loadedmetadata="onLoadMetaData"
      @timeupdate="onTimeUpdate"
    ></audio>
  </div>
</template>
<script lang="ts">
import CoverImageDefault from '@/layout/dhotyapps/cover.png';
import IconPause from '@/layout/dhotyapps/pause.png';
import IconPlay from '@/layout/dhotyapps/play.png';
import Core from '@any-touch/core';
import Pan from '@any-touch/pan';
import {
defineComponent,
nextTick,
onMounted,
onUnmounted,
PropType,
reactive,
ref,
toRefs,
watch,
} from 'vue';
import { AudioPlayerOption, AudioPlayerOptionDefault } from './types';
import { formatSecond } from './util';

const mergeOption = (option: AudioPlayerOption): AudioPlayerOption => {
  return {
    src: option.src || AudioPlayerOptionDefault.src,
    title: option.title || AudioPlayerOptionDefault.title,
    autoPlay: option.autoPlay || AudioPlayerOptionDefault.autoPlay,
    coverImage: option.coverImage || AudioPlayerOptionDefault.coverImage,
    coverRotate: option.coverRotate || AudioPlayerOptionDefault.coverRotate,
    progressBarColor:
      option.progressBarColor || AudioPlayerOptionDefault.progressBarColor,
    indicatorColor:
      option.indicatorColor || AudioPlayerOptionDefault.indicatorColor,
  }
}

export default defineComponent({
  props: {
    option: {
      type: Object as PropType<AudioPlayerOption>,
      default: AudioPlayerOptionDefault,
    },
  },
  emits: [
    'loadedmetadata',
    'playing',
    'play',
    'play-error',
    'timeupdate',
    'pause',
    'ended',
    'progress-start',
    'progress-end',
    'progress-move',
    'progress-click',
  ],
  setup(props, { emit }) {
  const audioPlayer = ref<HTMLAudioElement | null>(null);
  const audioProgressWrap = ref<HTMLDivElement | null>(null);
  const audioProgressPoint = ref<HTMLDivElement | null>(null);
  const audioProgress = ref<HTMLDivElement | null>(null);
  const progressInterval = 200;
  const option_ = ref<AudioPlayerOption>(mergeOption(props.option || {}));
  let toucher: any = null;
  let timer: any = null;
  let currentTrackIndex = 0; // To track current song index in the track list
  const state = reactive({
    isPlaying: false,
    isDragging: false,
    currentTime: 0,
    totalTime: 0,
    totalTimeStr: '00:00',
    playlist: [] as AudioPlayerOption[],
    currentTrackIndex: 0,
  });

    //tips: initialize the state when switch music.
    const initState = () => {
      state.isPlaying = false
      state.isDragging = false
      state.currentTime = 0
      state.totalTime = 0
      state.totalTimeStr = '00:00'
    }
const stopTrack = () => {
  audioPlayer.value.pause(); // Hentikan pemutaran audio
  audioPlayer.value.currentTime = 0; // Reset waktu ke awal
  state.isPlaying = false; // Set status pemutaran ke false
  clearTimer(); // Hentikan timer
  state.currentTime = 0; // Reset waktu saat ini
  audioProgress.value.style.width = '0px'; // Reset lebar progress bar
  setPointPosition(0); // Reset posisi indikator progress
  emit('stop'); // Emit event jika diperlukan
}
    const playUpdate = () => {
      if (state.isDragging) {
        return
      }
      const offsetLeft =
        (audioPlayer.value.currentTime / audioPlayer.value.duration) *
        audioProgressWrap.value.offsetWidth
      state.currentTime = audioPlayer.value.currentTime
      audioProgress.value.style.width = `${offsetLeft}px`
      setPointPosition(offsetLeft)
      emit('playing')
    }
    const startTimer = () => {
      clearTimer()
      timer = window.setInterval(playUpdate, progressInterval)
      state.isPlaying = true
    }
    const clearTimer = () => {
      if (timer) {
        window.clearInterval(timer)
        timer = null
      }
    }
    const play = () => {
    audioPlayer.value
      .play()
      .then(() => {
        startTimer();
        setTotalTime(audioPlayer.value.duration);
      })
      .catch((error: any) => {
        emit('play-error', error);
      });
  };
    const pause = () => {
      audioPlayer.value.pause()
      state.isPlaying = false
    }
    const togglePlayer = () => {
      if (state.isPlaying) {
        pause()
      } else {
        play()
      }
    }
    const stopPlayer = () => {
      
        stop()
      
    }
    const setTotalTime = (seconds: number) => {
      state.totalTime = seconds
      state.totalTimeStr = formatSecond(state.totalTime)
    }
    const onAudioEnded = () => {
      console.log('onAudioEnded')
      state.isPlaying = false
      clearTimer()
      emit('ended')
    }
    const onAudioPause = () => {
      console.log('onAudioPause')
      state.isPlaying = false
      clearTimer()
      emit('pause')
    }
    const onAudioPlay = () => {
      console.log('onAudioPlay')
      state.isPlaying = true
      emit('play')
    }
    const onLoadMetaData = (e: any) => {
      console.log('onLoadMetaData', e)
      setTotalTime(e.target.duration)
      emit('loadedmetadata', e)
    }
    const onTimeUpdate = (event: any) => {
      emit('timeupdate', event)
    }
    const setPointPosition = (offsetLeft: number) => {
      audioProgressPoint.value.style.left = `${
        offsetLeft - audioProgressPoint.value.offsetWidth / 2
      }px`
    }
    const handleProgressPanStart = (event: any) => {
      state.isDragging = true
      emit('progress-start', event)
    }

    const handleProgressPanEnd = (event: any) => {
      audioPlayer.value.currentTime = state.currentTime
      play()
      state.isDragging = false
      emit('progress-end', event)
    }

    const handleProgressPanMove = (event: any) => {
      const pageX = event.x
      const bcr = event.target.getBoundingClientRect()
      const targetLeft = parseInt(getComputedStyle(event.target).left)
      let offsetLeft = targetLeft + (pageX - bcr.left)
      offsetLeft = Math.min(offsetLeft, audioProgressWrap.value.offsetWidth)
      offsetLeft = Math.max(offsetLeft, 0)
      setPointPosition(offsetLeft)
      audioProgress.value.style.width = `${offsetLeft}px`
      state.currentTime =
        (offsetLeft / audioProgressWrap.value.offsetWidth) * state.totalTime
      emit('progress-move', event)
    }
    
    const nextTrack = () => {
    if (option_.value.trackList && option_.value.trackList.length > 0) {
      currentTrackIndex = (currentTrackIndex + 1) % option_.value.trackList.length;
      const nextTrack = option_.value.trackList[currentTrackIndex];
      if (nextTrack && nextTrack.src) {
        option_.value.src = nextTrack.src;
        option_.value.title = nextTrack.title || option_.value.title; // Optional: Update title
        play(); // Automatically play the next track
      }
    } else {
      console.error('Track list is not defined or empty');
    }
  };


    const handleClickProgressWrap = (event: any) => {
      const { offsetX } = event
      if (event.target === audioProgressPoint.value) {
        return
      }
      state.currentTime =
        (offsetX / audioProgressWrap.value.offsetWidth) * state.totalTime
      audioPlayer.value.currentTime = state.currentTime
      setPointPosition(offsetX)
      audioProgress.value.style.width = `${offsetX}px`
      play()
      emit('progress-click', event)
    }

  watch(
    () => props.option,
    (newValue) => {
      option_.value = mergeOption(newValue || {});
      initState();
      if (option_.value.autoPlay) {
        nextTick(() => {
          play();
        });
      }
    },
    { deep: true },
  );

  onMounted(() => {
    toucher = new Core(document.getElementById('app') || undefined, {
      preventDefault: false,
    });
    toucher.use(Pan);
  });

  onUnmounted(() => {
    if (toucher) toucher.destroy();
  });

    return {
      audioPlayer,
    option_,
    ...toRefs(state),
    onAudioEnded,
    onAudioPlay,
    onAudioPause,
    onLoadMetaData,
    onTimeUpdate,
    play,
    stop,
    pause,
    togglePlayer,
    stopPlayer,
    stopTrack,
    nextTrack,
    formatSecond,
    handleProgressPanStart,
    handleProgressPanEnd,
    handleProgressPanMove,
    handleClickProgressWrap,
    audioProgressWrap,
    audioProgressPoint,
    audioProgress,
    IconPlay,
    IconPause,
    CoverImageDefault,
    }
  },
})
</script>
<style scoped>
.audio__player {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.audio__player-play {
  position: relative;
}
.audio__player-play:active,
.audio__player-play img:active {
  opacity: 0.75;
}
.audio__player-play img {
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 9999px;
}
.audio__player-play-icon {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background: #f0f0f0;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem;
  opacity: 0.8;
}
.audio__player-play-icon img {
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
}

.audio__player-progress-container {
  display: flex;
  flex-direction: column;
  width: 80%;
}

.audio__player-progress-wrap {
  position: relative;
  background: var(--p-text-color);
  height: 4px;
  border-radius: 3px;
  margin-top: 20px;
  cursor: pointer;
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
}

.audio__player-progress {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  border-radius: 3px;
}

.audio__player-progress-point {
  position: absolute;
  left: -8px;
  top: 50%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-top: -8px;
}

.audio__player-progress-point:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  margin: -4px 0 0 -4px;
  background: #fff;
  border-radius: 50%;
}
.audio__player-time {
  margin-top: 0.2rem;
  margin-left: auto;
}
.audio__player-time span {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.audio__player-title {
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: bold;
  color: #3c3c3c;
}
@keyframes audio__player-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.audio__player-spin-anim {
  animation: audio__player-spin 5s linear infinite;
}


/* STYLE */
.play-bar {
  background-color: var(--surface-ground); /* Spotify dark background */
  color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1100;
  width: 100%;
  padding: 10px 20px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.play-bar-left, .play-bar-right {
  display: flex;
  align-items: center;
}

.play-bar-left {
  display: flex;
  align-items: center;
}

.album-art-container {
  position: relative;
  display: inline-block;
  margin-right: 10px;
}

.album-art {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.song-info {
  display: flex;
  flex-direction: column;
}

.song-title {
  font-weight: bold;
  color: var(--p-text-color);
}

.song-artist {
  font-size: 12px;
  color: var(--p-text-color);
}


.play-bar-center {
  flex: 2;
  display: flex;
  justify-content: center;
}

.play-bar-controls {
  display: flex;
  align-items: center;
}

</style>
