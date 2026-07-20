import { Injectable } from '@angular/core';
import { Match } from '../config/match';

const PREVIEW_WIDTH = 356;
const PREVIEW_HEIGHT = 200;
const PREVIEW_RENDER_SCALE = 2;
const PREVIEW_CANVAS_WIDTH = PREVIEW_WIDTH * PREVIEW_RENDER_SCALE;
const PREVIEW_CANVAS_HEIGHT = PREVIEW_HEIGHT * PREVIEW_RENDER_SCALE;
const PREVIEW_VERTICAL_OFFSET = 21;
const PREVIEW_TOP_BAR_HEIGHT = 62;
const PREVIEW_TOP_LINE_Y = 61;
const PREVIEW_TOP_LINE_HEIGHT = 1;
const PREVIEW_SCORE_AREA_Y = 62;
const PREVIEW_SCORE_AREA_HEIGHT = 95;
const PREVIEW_BOTTOM_LINE_Y = PREVIEW_SCORE_AREA_Y + PREVIEW_SCORE_AREA_HEIGHT;
const PREVIEW_BOTTOM_LINE_HEIGHT = 1;
const PREVIEW_LEFT_WIDTH = 177;
const PREVIEW_RIGHT_X = 179;
const PREVIEW_RIGHT_WIDTH = 177;
const PREVIEW_CENTER_DIVIDER_X = 177;
const PREVIEW_CENTER_DIVIDER_WIDTH = 2;
const PREVIEW_CENTER_DIVIDER_Y = 62;
const PREVIEW_CENTER_DIVIDER_HEIGHT = 95;
const PREVIEW_BOTTOM_ROW_Y = 159;
const PREVIEW_BOTTOM_ROW_HEIGHT = PREVIEW_HEIGHT - PREVIEW_BOTTOM_ROW_Y;
const PREVIEW_LOGO_CENTER_X = 178;
const PREVIEW_LOGO_Y = 2;
const PREVIEW_LOGO_HEIGHT = 110;
const PREVIEW_TEAM_FONT_SIZE = 19;
const PREVIEW_TEAM_LABEL_Y = 147;
const PREVIEW_LEFT_TEAM_X = 88;
const PREVIEW_RIGHT_TEAM_X = 267;
const PREVIEW_LEFT_SCORE_X = 90;
const PREVIEW_RIGHT_SCORE_X = 270;
const PREVIEW_SCORE_BASELINE_Y = 126;
const PREVIEW_LEFT_SCORE = 3;
const PREVIEW_RIGHT_SCORE = 7;
const PREVIEW_SCORE_FONT_SIZE = 69;
const PREVIEW_BACKGROUND = '#000000';
const PREVIEW_DIVIDER = '#ffffff';
const PREVIEW_FONT_FAMILY = 'heading-font, sans-serif';
const PREVIEW_FONT_WEIGHT = '700';
const PREVIEW_LEFT_TEXT_MAX_WIDTH = 166;
const PREVIEW_RIGHT_TEXT_MAX_WIDTH = 166;

@Injectable({ providedIn: 'root' })
export class ScoreboardPreviewService {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly logoImageByPath = new Map<string, HTMLImageElement>();
  private cacheKey = '';
  private cachedUrl = '';

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = PREVIEW_CANVAS_WIDTH;
    this.canvas.height = PREVIEW_CANVAS_HEIGHT;

    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Unable to initialize scoreboard preview canvas');
    }
    this.context = context;
    this.context.fillStyle = PREVIEW_BACKGROUND;
    this.context.fillRect(0, 0, PREVIEW_CANVAS_WIDTH, PREVIEW_CANVAS_HEIGHT);
    this.cachedUrl = this.canvas.toDataURL('image/png');
  }

  previewUrl(match: Match): string {
    const leftTeam = match.teams.left;
    const rightTeam = match.teams.right;
    const leftProfileTeam = match.profile.teams.left;
    const rightProfileTeam = match.profile.teams.right;
    const logoPath = `/assets/logos/${match.logo}`;
    const cacheKey = [
      match.logo,
      leftTeam.name,
      rightTeam.name,
      leftProfileTeam.color,
      rightProfileTeam.color,
      leftProfileTeam.textColor,
      rightProfileTeam.textColor
    ].join('|');

    if (cacheKey === this.cacheKey) {
      return this.cachedUrl;
    }

    const logoImage = this.getLogoImage(logoPath);
    if (!logoImage.complete) {
      logoImage.onload = () => {
        this.cacheKey = '';
      };
      return this.cachedUrl;
    }

    this.drawPreview({
      leftName: leftTeam.name,
      rightName: rightTeam.name,
      leftBackground: leftProfileTeam.color,
      rightBackground: rightProfileTeam.color,
      leftText: leftProfileTeam.textColor,
      rightText: rightProfileTeam.textColor,
      logoImage
    });
    this.cachedUrl = this.canvas.toDataURL('image/png');
    this.cacheKey = cacheKey;
    return this.cachedUrl;
  }

  private drawPreview({
    leftName,
    rightName,
    leftBackground,
    rightBackground,
    leftText,
    rightText,
    logoImage
  }: {
    leftName: string;
    rightName: string;
    leftBackground: string;
    rightBackground: string;
    leftText: string;
    rightText: string;
    logoImage: HTMLImageElement;
  }) {
    const shiftedTopBarY = PREVIEW_VERTICAL_OFFSET;
    const shiftedTopLineY = PREVIEW_TOP_LINE_Y + PREVIEW_VERTICAL_OFFSET;
    const shiftedBottomLineY = PREVIEW_BOTTOM_LINE_Y + PREVIEW_VERTICAL_OFFSET;
    const shiftedScoreAreaY = PREVIEW_SCORE_AREA_Y + PREVIEW_VERTICAL_OFFSET;
    const shiftedCenterDividerY = PREVIEW_CENTER_DIVIDER_Y + PREVIEW_VERTICAL_OFFSET;
    const shiftedBottomRowY = PREVIEW_BOTTOM_ROW_Y + PREVIEW_VERTICAL_OFFSET;
    const shiftedLogoY = PREVIEW_LOGO_Y + PREVIEW_VERTICAL_OFFSET;
    const shiftedScoreBaselineY = PREVIEW_SCORE_BASELINE_Y + PREVIEW_VERTICAL_OFFSET;
    const shiftedTeamLabelY = PREVIEW_TEAM_LABEL_Y + PREVIEW_VERTICAL_OFFSET;

    const context = this.context;
    context.setTransform(PREVIEW_RENDER_SCALE, 0, 0, PREVIEW_RENDER_SCALE, 0, 0);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    context.clearRect(0, 0, PREVIEW_WIDTH, PREVIEW_HEIGHT);
    context.fillStyle = PREVIEW_BACKGROUND;
    context.fillRect(0, 0, PREVIEW_WIDTH, PREVIEW_HEIGHT);

    context.fillStyle = leftBackground;
    context.fillRect(0, shiftedScoreAreaY, PREVIEW_LEFT_WIDTH, PREVIEW_SCORE_AREA_HEIGHT);
    context.fillStyle = rightBackground;
    context.fillRect(PREVIEW_RIGHT_X, shiftedScoreAreaY, PREVIEW_RIGHT_WIDTH, PREVIEW_SCORE_AREA_HEIGHT);
    context.fillStyle = PREVIEW_DIVIDER;
    context.fillRect(PREVIEW_CENTER_DIVIDER_X, shiftedCenterDividerY, PREVIEW_CENTER_DIVIDER_WIDTH, PREVIEW_CENTER_DIVIDER_HEIGHT);

    context.fillStyle = PREVIEW_BACKGROUND;
    context.fillRect(0, shiftedTopBarY, PREVIEW_WIDTH, PREVIEW_TOP_BAR_HEIGHT);
    context.fillRect(0, shiftedBottomRowY, PREVIEW_WIDTH, PREVIEW_BOTTOM_ROW_HEIGHT);
    context.fillRect(0, 0, PREVIEW_WIDTH, PREVIEW_VERTICAL_OFFSET);
    context.fillStyle = PREVIEW_DIVIDER;
    context.fillRect(0, shiftedTopLineY, PREVIEW_WIDTH, PREVIEW_TOP_LINE_HEIGHT);
    context.fillRect(0, shiftedBottomLineY, PREVIEW_WIDTH, PREVIEW_BOTTOM_LINE_HEIGHT);

    const logoWidth = (logoImage.width * PREVIEW_LOGO_HEIGHT) / logoImage.height;
    const logoX = PREVIEW_LOGO_CENTER_X - (logoWidth / 2);
    context.drawImage(logoImage, logoX, shiftedLogoY, logoWidth, PREVIEW_LOGO_HEIGHT);

    drawText(context, PREVIEW_LEFT_SCORE.toString(), PREVIEW_LEFT_SCORE_X, shiftedScoreBaselineY, PREVIEW_SCORE_FONT_SIZE, leftText);
    drawText(context, PREVIEW_RIGHT_SCORE.toString(), PREVIEW_RIGHT_SCORE_X, shiftedScoreBaselineY, PREVIEW_SCORE_FONT_SIZE, rightText);
    drawText(context, leftName, PREVIEW_LEFT_TEAM_X, shiftedTeamLabelY, PREVIEW_TEAM_FONT_SIZE, leftText, PREVIEW_LEFT_TEXT_MAX_WIDTH);
    drawText(context, rightName, PREVIEW_RIGHT_TEAM_X, shiftedTeamLabelY, PREVIEW_TEAM_FONT_SIZE, rightText, PREVIEW_RIGHT_TEXT_MAX_WIDTH);
  }

  private getLogoImage(path: string): HTMLImageElement {
    const existing = this.logoImageByPath.get(path);
    if (existing) {
      return existing;
    }

    const logoImage = createImage(path);
    this.logoImageByPath.set(path, logoImage);
    return logoImage;
  }
}

function createImage(src: string): HTMLImageElement {
  const image = new Image();
  image.src = src;
  return image;
}

function drawText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fillColor: string,
  maxWidth?: number
) {
  context.save();
  context.textAlign = 'center';
  context.textBaseline = 'alphabetic';
  context.font = `${PREVIEW_FONT_WEIGHT} ${fontSize}px ${PREVIEW_FONT_FAMILY}`;
  context.fillStyle = fillColor;

  if (maxWidth) {
    context.fillText(text, x, y, maxWidth);
  } else {
    context.fillText(text, x, y);
  }
  context.restore();
}
