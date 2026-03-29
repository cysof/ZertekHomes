import { Link } from "react-router";
import { Phone, Mail } from "lucide-react";
import type { Agent } from "../types";

type Props = {
  agent: Agent;
};

export default function AgentCard({ agent }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Avatar */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 h-48 flex items-center justify-center relative">
        <div className="w-24 h-24 rounded-full bg-green-600 flex items-center justify-center">
          <span className="text-white text-3xl font-bold">{agent.initials}</span>
        </div>
        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          Verified
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-lg">{agent.name}</h3>
        <p className="text-green-600 text-sm font-medium mb-1">{agent.title}</p>
        <p className="text-gray-500 text-xs mb-4">
          Specialises in {agent.specialization}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-gray-100 mb-4">
          <div className="text-center">
            <p className="font-bold text-gray-900 text-lg">{agent.listings}</p>
            <p className="text-gray-400 text-xs">Listings</p>
          </div>
          <div className="text-center border-x border-gray-100">
            <p className="font-bold text-gray-900 text-lg">{agent.deals}</p>
            <p className="text-gray-400 text-xs">Deals</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-gray-900 text-lg">{agent.years}yr</p>
            <p className="text-gray-400 text-xs">Exp.</p>
          </div>
        </div>

        {/* Contact */}
        <div className="flex gap-2">
          
            <a href={`tel:${agent.phone}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            <Phone size={13} />
            Call
          </a>
          
           <a href={`mailto:${agent.email}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            <Mail size={13} />
            Email
          </a>
        </div>
      </div>
    </div>
  );
}