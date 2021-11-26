import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors, Common, Fonts, Layout } from '../../Theme';
import { withTranslation } from 'react-i18next';

export class ScoreTable extends React.PureComponent {
  constructor(props) {
    super(props);
    const { t } = props;
    this.state = {
      bogeyCount: 0,
      doubleBogeyCount: 0,
      eagleCount: 0,
      birdyCount: 0,
      parCount: 0,
      strokeCount: 0,
      tableHeaders: [
        t('scoreSheet.hole'),
        t('scoreSheet.par'),
        t('scoreSheet.me'),
      ],
      tableHeadersOnePlayer: [
        t('scoreSheet.hole'),
        t('scoreSheet.par'),
        t('scoreSheet.stroke'),
      ],
    }
  }
  componentDidMount() {
    this.mounted = true;
    // if (this.mounted) {
    //   this.calculateKPI();
    // }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  // componentDidUpdate() {
  //   this.calculateKPI();
  // }

  // calculateKPI = async () => {
  //   if (this.props.scoreCards) {
  //     let strokeCount = await this.props.scoreCards[0].reduce((accumulator, current) => accumulator + (current.stroke !== '-' ? current.stroke : 0), 0);
  //     let parCount = await this.props.scoreCards[0].reduce((accumulator, current) => accumulator + current.par, 0);
  //     this.mounted && this.setState({ strokeCount, parCount });
  //   }
  // }

  // get the position of index
  handleParPress = (item, index) => {
    this.props.handleSetPar(item, index);
  }

  selectPlayer = (index) => {
    this.props.selectPlayer(index)
  }

  // get the hole number when clicked
  handleHolePress = (item, index, p) => {
    this.props.handleHolePress(item, index, p);
  }

  retrieveStrokeStyle = (accessor, item) => {

    if (accessor === 'stroke' && item[accessor]) {
      if (item[accessor] - item[this.props.accessors[1]] === 0) {
        return {}
      }
      if (item[accessor] - item[this.props.accessors[1]] === 1) {
        return { ...Common.bogeyStroke }
      }
      else if (item[accessor] - item[this.props.accessors[1]] > 1) {
        return { ...Common.doubleBogeyStroke }
      }
      else if (item[accessor] - item[this.props.accessors[1]] < -1) {
        return { ...Common.eagleStroke }
      }
      else {
        return { ...Common.birdyStroke }
      }
    }
    else {
      return {}
    }
  }

  renderHeader = (index) => {

    let tableHeaders = this.props.players.length > 1 ? this.state.tableHeaders : this.state.tableHeadersOnePlayer;
    const allHeaders = index === 0 ? tableHeaders : [this.props?.players[index]?.player_name];
    return <View
      style={{
        flexDirection: 'column',
      }}>
      {allHeaders.map((item, id) => {
        return (
          <TouchableOpacity
            key={id}
            onPress={() => this.selectPlayer(index)}
            disabled={item === this.props.t('scoreSheet.hole') || item === this.props.t('scoreSheet.par') || this.props.players.length === 1}
          >
            <View
              key={id}
              style={[Layout.justifyContentCenter, Layout.alignItemsStart, Layout.flex, {
                backgroundColor: (item !== this.props.t('scoreSheet.hole') && item !== this.props.t('scoreSheet.par')) && this.props.currentPlayer === index ? (this.props.players.length > 1 ? Colors.icons : Colors.backgroundColor) : Colors.backgroundColor,
                alignSelf: 'stretch',
                height: 40,
                width: 53,
                paddingHorizontal: 5
              }]}>
              <Text
                style={[
                  {
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: Colors.white,
                  },
                ]}
                textBreakStrategy="simple">
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  };

  calculateStrokeCount = (index) => {
    let strokeCount = this.props.scoreCards[index].reduce((accumulator, current) => accumulator + (current.stroke !== '-' ? current.stroke : 0), 0);
    return strokeCount.toString();
  }

  renderTable = (player, playerIndex) => {
    const allAccessors = playerIndex === 0 ? this.props.accessors : ['stroke'];
    return <View style={[Layout.row, {
      backgroundColor: '#fff',
      // borderBottomColor: 'lightgrey',
      flex: 1,
      alignSelf: 'stretch'
    }]} >
      <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={true} persistentScrollbar={true} contentContainerStyle={[{ flex: 1 }, Layout.alignItemsCenter, Layout.justifyContentEvenly]}>
        {
          player.map((item, index) => (
            <View key={index} style={[Layout.alignItemsCenter, { flex: 1, minWidth: 33 }]}>
              {
                allAccessors.map((accessor, accIndex) => (
                  <TouchableOpacity key={accIndex}
                    activeOpacity={1}
                    style={[Layout.justifyContentCenter, Layout.alignItemsCenter, { height: 30, marginVertical: 5, width: 30, ...(accessor === 'hole' && { backgroundColor: this.props.holeNumber === item.hole ? '#ededed' : null }), ...(accessor === 'stroke' && { backgroundColor: this.props.holeNumber === item.hole && (this.props.currentPlayer === playerIndex) ? item[accessor] ? null : '#ededed' : null }) }, this.retrieveStrokeStyle(accessor, item)]}
                    onPress={accIndex === 1 ? () => this.handleParPress(item, index) : () => this.handleHolePress(item, index, playerIndex)}>
                    <Text style={[Fonts.textRegular,
                    { fontWeight: 'bold', ...Layout.selfStretch, textAlign: 'center' }]}
                      textBreakStrategy="simple">
                      {item[accessor] === 0 ? '-' : item[accessor]}
                    </Text>
                  </TouchableOpacity>))
              }
            </View>
          ))
        }
      </ScrollView>
    </View>
  };


  renderSummary = (index) => {
    return <View
      style={{
        flexDirection: 'column',
        backgroundColor: Colors.backgroundColor,
      }}>
      {index === 0 && <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: 40,
          width: 30,
          paddingHorizontal: 5
        }}>
        <Text
          style={[
            Fonts.textSmall,
            { fontWeight: 'bold', color: Colors.white, fontSize: 10, },
          ]}
          textBreakStrategy="simple">
          {this.props.direction}
        </Text>
      </View>}
      {index === 0 && <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: 40,
          width: 30,
          paddingHorizontal: 5
        }}>
        <Text
          style={[
            Fonts.textSmall,
            { fontWeight: 'bold', color: Colors.white },
          ]}
          textBreakStrategy="simple">
          {this.props.scoreCards[0].reduce((accumulator, current) => accumulator + (current.parCount !== '-' ? current.par : 0), 0)}
        </Text>
      </View>}
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: 40,
          width: 30,
          paddingHorizontal: 5
        }}>
        <Text
          style={[
            Fonts.textSmall,
            { fontWeight: 'bold', color: Colors.white },
          ]}
          textBreakStrategy="simple">
          {this.calculateStrokeCount(index)}
        </Text>
      </View>
    </View>
  };

  render() {
    return (
      this.props.scoreCards &&
      this.props.scoreCards.map((cards, index) =>
      (<View key={index} style={{ flexDirection: 'row', width: '100%' }}>
        {this.renderHeader(index)}
        {this.renderTable(cards, index)}
        {this.renderSummary(index)}
      </View>)
      ));
  }
}

ScoreTable.defaultProps = {
  scores: [],
  headers: [],
  accessors: ['hole', 'par', 'stroke']
}

export default withTranslation()(ScoreTable);
