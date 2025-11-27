import { Search } from 'lucide-react'

interface NoDataProps {
  message: string;
}

const NoData = ({ message }: NoDataProps) => {
    return (
        <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">{message}</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
    )
}

export default NoData