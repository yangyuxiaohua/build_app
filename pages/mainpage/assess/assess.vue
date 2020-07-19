<template>
	<view class="assess_content">
		<u-toast ref="uToast" />
		<u-icon name="list-dot" color="#2979ff" size="40" @click="onProjectList()" class="choseProjectIcon"></u-icon>
		<view class="selectList">
			<u-select v-model="show" mode="single-column" :list="projectList" @confirm="confirm"></u-select>
		</view>
		<view class="projectName">
			{{projectName}}
		</view>
		<view class="assess_content_title">
			<text>分部/分项工程</text>
			<text>进度（完成/任务）</text>
		</view>
		<!-- <uni-collapse :accordion="true">
 			<uni-collapse-item class="firstmenu" v-for="(item,index) in accordion" :key="index" :title="item.title" :show-animation="item.animation">
				<view class="">
					<uni-collapse :accordion="true">
 					<uni-collapse-item class="secmenu" v-for="(i,index) in item.children" :key="index" :title="i.title" :show-animation="item.animation">
						<view class="">
							<u-cell-group >
							<u-cell-item style="background-color: #F5F5F9;" class="thrdmenu" :title="j.title" @click='assess(j)' v-for="(j,index) in i.children" :key='index'></u-cell-item>
							<u-cell-item title="会员等级" value="新版本" @click='assess'></u-cell-item>
						</u-cell-group>
						</view>
						
 					</uni-collapse-item>
 				</uni-collapse>
				</view>
 				
 			</uni-collapse-item>
 		</uni-collapse> -->

		<view class="menuLevel1" v-for="(item,index) in accordion" :key='index'>
			<view class="menuLevel1Content" @click="clickLevel(1,item)" :class="{chosedMenu:cid==item.id}">
				<u-row gutter="16">
					<u-col span="9">
						<view style="text-indent: 20rpx;" class="showEllipsis">
							<text>{{item.title}}</text>
						</view>
					</u-col>
					<u-col span="2">
						<view style="text-align: center;">
							<text>（{{item.num}}）</text>
						</view>
					</u-col>
					<u-col span="1">
						<view style="text-align: center;">
							<u-icon name="arrow-down" color="#a0cfff" size="28" v-if="item.show1"></u-icon>
							<u-icon name="arrow-up" color="#a0cfff" size="28" v-else></u-icon>
						</view>
					</u-col>
				</u-row>
			</view>
			<view class="menuLevel2" v-for="(i,index2) in item.children " v-if="i.show">
				<view class="menuLevel2Content" @click="clickLevel(2,i)" :class="{chosedMenu:cid==i.id}">
					<u-row gutter="16">
						<u-col span="9">
							<view style="text-indent: 20rpx;" class="showEllipsis">
								<text>{{i.title}}</text>
							</view>
						</u-col>
						<u-col span="2">
							<view style="text-align: center;">
								<text>（{{i.num}}）</text>
							</view>
						</u-col>
						<u-col span="1">
							<view style="text-align: center;">
								<u-icon name="arrow-down" color="#a0cfff" size="28" v-if="i.show1"></u-icon>
								<u-icon name="arrow-up" color="#a0cfff" size="28" v-else></u-icon>
							</view>
						</u-col>
					</u-row>
				</view>
				<view class="menuLevel3" v-for="(j,index3) in i.children" v-if="j.show">
					<view class="menuLevel3Content" @click="clickLevel(3,j)" :class="{chosedMenu:cid==j.id}">
						<u-row gutter="16">
							<u-col span="11">
								<view style="padding-left:20rpx; min-height: 80rpx; display: flex; align-items: center;">
									<text :class="{ca0cfff:j.checklistFinished}">{{j.title}}</text>
								</view>
							</u-col>
							<u-col span="1">
								<view style="text-align: center;">
									<u-icon name="arrow-right" color="#a0cfff" size="28"></u-icon>
								</view>
							</u-col>
						</u-row>

					</view>
				</view>

			</view>

		</view>
	</view>
</template>

<script src='./assess.js'>
</script>

<style lang="less" scoped>
	.assess_content {
		height: calc(100vh);
		background-color: #F5F5F9;

		.projectName {
			line-height: 80upx;
			border-bottom: 1px solid #ccc;
			text-align: center;
		}

		.assess_content_title {
			padding: 0 20rpx;
			line-height: 60rpx;
			display: flex;
			justify-content: space-between;
		}

		.firstmenu {
			background-color: #fff;

			// color: #fff;
			.secmenu {
				// background-color: #F5F5F9;
				background-color: #f2f2f2;

				.thrdmenu {
					// background-color: #f2f2f2;
					// background-color: #000;
				}
			}
		}

		.choseProjectIcon {
			padding: 10px;
			border: 1px solid #ccc;
			border-radius: 60px;
			background-color: #fff;
			position: fixed;
			right: 8px;
			bottom: 58px;
			z-index: 9999;
		}

		.menuLevel1 {
			border-bottom: 8rpx solid #F5F5F9;

			.menuLevel1Content,
			.menuLevel2Content,
				{
				height: 80rpx;
				line-height: 80rpx;
				font-size: 28rpx;
				background-color: #FFFFFF;
				border-bottom: 1px solid #ccc;
				// padding-right: 10rpx;
			}

			.menuLevel2 {

				// transition: all 1s;
				.menuLevel2Content {
					border-bottom: 1px solid #ccc;
					background-color: #f2f2f2;
					// background-color: #F8F4F2;
				}

				.chosedMenu {
					background-color: #c8c9cc;
					// color:#fff;
				}

				.menuLevel3 {
					.menuLevel3Content {
						background-color: #fff;
						border-bottom: 1px solid #ccc;
						font-size: 28rpx;
						background-color: #f2f2f2;
					}

					.chosedMenu {
						background-color: #c8c9cc;
						// color:#fff;
					}
				}


			}

			.chosedMenu {
				background-color: #c8c9cc;
				// color:#fff;
			}

		}

		.showEllipsis {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
		}
		.ca0cfff{
			color:#a0cfff;
		}
	}
</style>
