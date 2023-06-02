import { useEffect, useRef } from "react";
import { GameStringComponent } from "../../../Locale/Locale";
import { GameString, PlayerId } from "../../../Messages/GameUpdate";
import { UserValue } from "../../Lobby/LobbyUser";
import { GameTable, PocketRef, getCard, getPlayer } from "../GameTable";
import AnimationView, { AnimationState } from "./Animations/AnimationView";
import CardButtonView from "./CardButtonView";
import CountPocket from "./CountPocket";
import PlayerView from "./PlayerView";
import PocketView, { PocketPositionMap, PocketPositionRef, Rect } from "./PocketView";
import "./GameScene.css";
import { GameUpdateHandler } from "../GameUpdateHandler";
import { UserId } from "../../../Messages/ServerMessage";
import { Connection } from "../../../Messages/Connection";

const FRAMERATE = 60;

export interface TableProps {
    connection: Connection;
    game: GameUpdateHandler;
    table: GameTable;
    users: UserValue[];
    lobbyOwner?: UserId;
}

export default function GameScene({ connection, game, table, users, lobbyOwner }: TableProps) {
    const positions: PocketPositionMap = {
        main_deck: useRef() as PocketPositionRef,
        discard_pile: useRef() as PocketPositionRef,
        selection: useRef() as PocketPositionRef,
    };

    const playerPositions = useRef<Record<PlayerId, PocketPositionMap | null>>({});

    useEffect(() => {
      let startTime = Date.now();
      const interval = setInterval(() => {
        let endTime = Date.now();
        game.tick(endTime - startTime);
        startTime = endTime;
      }, 1000 / FRAMERATE);
      return () => clearInterval(interval);
    }, []);
  
    const showReturnButton = () => {
      return table.myUserId == lobbyOwner
        && table.status.flags.includes('game_over');
    };
  
    const handleReturnLobby = () => connection.sendMessage('lobby_return');

    const getPocketRect = (pocket: PocketRef): Rect | undefined => {
      if (pocket) {
        if ('player' in pocket) {
          if (pocket.player in playerPositions.current) {
            let positions = playerPositions.current[pocket.player];
            if (positions) return positions[pocket.name]?.current.getRect();
          }
        } else {
          return positions[pocket.name]?.current.getRect();
        }
      }
      return undefined;
    };

    const newGameStringComponent = (message: GameString, key?: number) => {
      return <GameStringComponent key={key} table={table} users={users} message={message} />
    };

    const newPlayerView = (player_id: PlayerId) => {
      const player = getPlayer(table, player_id);
      const user = users.find(user => user.id === player.userid);
      
      return <PlayerView ref={ref => playerPositions.current[player_id] = ref} key={player_id} table={table} user={user} player={player} />;
    };

    return (<div>
        { showReturnButton() ? <button onClick={handleReturnLobby}>Return</button> : null }
        <div className="game-scene">
        <div className="align-center main-deck">
          <PocketView ref={positions.discard_pile} table={table} cards={table.pockets.discard_pile.slice(-1)} className='single-card-pocket' />
          <CountPocket ref={positions.main_deck} table={table} cards={table.pockets.main_deck} />
          <div className="selection-pocket">
            <PocketView ref={positions.selection} table={table} cards={table.pockets.selection} />
          </div>
        </div>
        <div className="align-center status-text">
          { 'status_text' in table.status.request ? newGameStringComponent(table.status.request.status_text) : null }
        </div>
        <div className="align-center">
          { table.alive_players.map(newPlayerView) }
        </div>
        <div className="align-center">
          { table.pockets.button_row.map(id => <CardButtonView key={id} card={getCard(table, id)} /> )}
        </div>
        <AnimationView state={table.animation} table={table} getPocketRect={getPocketRect} />
      </div>
      </div>
  );
}